import * as d3 from 'd3'
import React, { Component } from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import MinusIcon from '../SvgIcons/MinusIcon'
import PlusIcon from '../SvgIcons/PlusIcon'
import Switch from '../Switch'
import { mockData } from './mockData'

interface IZoomButtonWrapper {
  zoomBtnPosition?: 'flex-start' | 'center' | 'flex-end'
}

const ZoomButtonWrapper = styled.div<IZoomButtonWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.zoomBtnPosition};
  z-index: 1;
  position: absolute;
  top: 1rem;
  right: 0;
`

let i = 0
const duration = 750

interface ICoordinate {
  x: number
  y: number
}

// Creates a curved (diagonal) path from parent to the child nodes
function diagonal(s: ICoordinate, d: ICoordinate) {
  const path = `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`

  return path
}

export interface IColorMapping {
  fillColor?: string
  strokeColor: string
}
export interface INodeColorMapping {
  [s: string]: IColorMapping
}
export interface IData {
  children: any
  name: string
  id: number | string
}
interface IProps {
  data: IData
  handleNodeClick?: (node: any) => void
  hasZoomBtns?: boolean
  isDetailsCardShowing?: boolean
  zoomBtnPosition?: 'flex-start' | 'center' | 'flex-end'
  isZoomAbleOnScroll?: boolean
  onDetailsClick?: (d: any) => void
  onNodeTextClick?: (d: any) => void
  onClose?: (d: any) => void
  isRootNodeCollapseEnabled?: boolean
  margin?: object
  nodeColorMapping: INodeColorMapping
  height?: number
  width?: number
  background?: string
}

interface IState {
  scale: number
  xCoordinate: number
  yCoordinate: number
  currentClickedId: string
}

d3.selection.prototype.moveToBack = function (this: any) {
  return this.each(function (this: any) {
    const firstChild = this.parentNode && this.parentNode.firstChild
    if (firstChild) {
      return this.parentNode && this.parentNode.insertBefore(this, firstChild)
    }
  })
}

d3.selection.prototype.moveToFront = function (this: any) {
  return this.each(function (this: any) {
    return this.parentNode && this.parentNode.appendChild(this)
  })
}

class Tree extends Component<IProps> {
  private static defaultProps = {
    data: mockData,
    handleNodeClick: (node: any) => undefined,
    hasZoomBtns: false,
    height: 650,
    isDetailsCardShowing: false,
    isRootNodeCollapseEnabled: true,
    isZoomAbleOnScroll: false,
    margin: { bottom: 30, left: 150, right: 90, top: 20 },
    width: 960,
    zoomBtnPosition: 'flex-end',
  }

  public readonly state: IState = {
    currentClickedId: '',
    scale: 1,
    xCoordinate: 0,
    yCoordinate: 0,
  }

  private margin: any
  private height: any
  private width: any
  private treeMap: any
  private root: any
  private svgRef: any
  private svgG: any

  constructor(props: IProps) {
    super(props)

    this.svgRef = React.createRef()

    // declares a tree layout and assigns the size
    this.margin = props.margin
    this.height =
      props.height && props.height - this.margin.top - this.margin.bottom
    this.width =
      props.width && props.width - this.margin.left - this.margin.right
    // Setting node size instead of a fixed height and width so that tree can take more space as per no. of nodes
    this.treeMap = d3.tree().nodeSize([40, 40])
    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(props.data, (d: any) => d && d.children)
    this.root.x0 = 200
    this.root.y0 = this.height / 2
    // Collapse after the second level
    if (this.root.children) {
      this.root.children.forEach(this.collapse)
    }
  }

  public componentDidMount() {
    this.createChart()
  }

  public componentDidUpdate(prevProps, state) {
    if (
      this.props.isDetailsCardShowing === false &&
      this.state.currentClickedId
    ) {
      // Removes existing rectangle box created by onDetailsClick handler
      this.resetDetailsClickStyles()
    }
  }

  public render() {
    return (
      <div
        id="D3TreeWrapper"
        style={{
          background: this.props.background || 'transparent',
          position: 'relative',
          width: '100%',
        }}
      >
        {this.props.hasZoomBtns && (
          <ZoomButtonWrapper zoomBtnPosition={this.props.zoomBtnPosition}>
            <Switch
              isActive={true}
              handleSwitch={(val) => {
                if (val.isSwitchOn) {
                  this.handleZoom('zoomin')
                } else {
                  this.handleZoom('zoomout')
                }
              }}
              switchText="zoom"
              hasActiveBg={false}
              switchIcons={{
                iconLeft: (
                  <MinusIcon height={16} color={baseColors.GREY_DARK} />
                ),
                iconRight: (
                  <PlusIcon height={16} color={baseColors.GREY_DARK} />
                ),
              }}
            />
          </ZoomButtonWrapper>
        )}
        <svg
          ref={this.svgRef}
          width={this.width + this.margin.right + this.margin.left}
          height={this.height + this.margin.top + this.margin.bottom}
          style={{
            background: this.props.background || 'transparent',
            width: '100%',
          }}
          viewBox={`0 0 ${this.width + this.margin.right + this.margin.left} ${
            this.height + this.margin.top + this.margin.bottom
          }`}
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    )
  }

  public handleZoom = (zoomType: string) => {
    if (this.props.hasZoomBtns) {
      let currentScale = this.state.scale
      if (zoomType === 'zoomin') {
        currentScale = this.state.scale * 1.5
      } else {
        currentScale = this.state.scale / 1.5
      }
      this.handleZoomCommon(currentScale)
    }
  }

  /**
   * @param {Node}
   *
   * Collapses nodes after a certain depth
   */
  private collapse = (d: any) => {
    if (d.data?.startCollapsed) {
      d._children = d.children
      d._children.forEach(this.collapse)
      d.children = null
    }

    if (d.depth < 3 && d.children) {
      d.children.forEach(this.collapse)
      return
    }

    if (d.children) {
      d._children = d.children
      d._children.forEach(this.collapse)
      d.children = null
    }
  }

  private handleZoomCommon = (newScale, newX?, newY?) => {
    let currentXCoordinate = newX ?? this.state.xCoordinate
    let currentYCoordinate = newY ?? this.state.yCoordinate
    this.setState({
      scale: newScale,
      xCoordinate: currentXCoordinate,
      yCoordinate: currentYCoordinate,
    })
    currentXCoordinate = this.state.xCoordinate
    currentYCoordinate = this.state.yCoordinate
    this.svgG.attr(
      'transform',
      `translate(${currentXCoordinate + 200},${
        currentYCoordinate + this.height / 2
      }) scale(${newScale})`
    )
  }

  private createChart = () => {
    this.svgG = d3
      .select(this.svgRef.current)
      .style('user-select', 'none')
      .call(
        d3
          .zoom()
          // .scaleExtent([1, 1]) // use this line for disabling zoom on mousewheel scroll
          .on('zoom', (d) => {
            if (this.props.isZoomAbleOnScroll) {
              const scale = d3.event.transform.k
              const x = d3.event.transform.x
              const y = d3.event.transform.y
              this.handleZoomCommon(scale, x, y)
            }
          })
      )
      .append('g')
      .attr('transform', `translate(200, ${this.height / 2})`)

    this.update(this.root)
  }

  // Toggle children on click.
  private click = (d: any) => {
    this.props.handleNodeClick!(d.data)
    const hasChildren = d.data && d.data.children && d.data.children.length > 0
    const hasDetailsClick = d.data && d.data.hasDetailsClick
    if (this.props.onDetailsClick && hasDetailsClick && !hasChildren) {
      const helperText = d.data && d.data.helperText
      this.props.onDetailsClick(d.data)
      // Reset previous click styles
      this.resetDetailsClickStyles()

      const currentNodeID: any = d3.select(
        `#node-${this.props.data.id}-${d.id}`
      )
      this.setState({
        currentClickedId: `#node-${this.props.data.id}-${d.id}`,
      })

      // Get current anchor position of texts for clicked node
      this.getCurrentAnchorPositionForClickedNodeTexts(d)

      // Shows the crossIcon
      this.getCrossIcon(currentNodeID, helperText)

      // Shows the shadowed rectangle
      this.getShadowedRectangle(d)
      // Brings the clicked node elment to the top
      currentNodeID.moveToFront()
    }
    if (!this.props.isRootNodeCollapseEnabled && this.isRootNode(d)) {
      return
    }
    if (this.isRootNode(d)) {
      // Removes duplicates from the root node
      this.svgG.select('g.node').select('.helperText').remove()
      this.svgG.select('g.node').select('.detail').remove()
    }

    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }
    this.update(d)
  }

  private isRootNode = (d: any) => d.depth === 0

  private hasSiblings = (d: any) => {
    const hasSiblings = d.parent
      ? d.parent.children && d.parent.children.length > 1
      : false
    return hasSiblings
  }

  private areSiblingsLeaves = (d: any) => {
    const siblings = d.parent.children
    for (const sibling of siblings) {
      if (sibling.children && sibling.children.length > 0) {
        return true
      }
    }
    return false
  }

  private getNodeStrokeColor = (d: any) => {
    const defaultStrokeColor = 'steelblue'

    const nodeData: { nodeType: string } = d.data
    if (!nodeData) {
      return defaultStrokeColor
    }

    const { nodeType } = nodeData
    const { nodeColorMapping } = this.props

    const colorMapping = nodeColorMapping[nodeType]

    if (!colorMapping) {
      return defaultStrokeColor
    }

    const { strokeColor } = colorMapping

    if (!strokeColor) {
      return defaultStrokeColor
    }

    return strokeColor
  }

  private getNodeFillColor = (d: any) => {
    if (!d._children) {
      return '#fff'
    }

    const defaultFillColor = d._children ? 'red' : '#fff'

    const nodeData = d.data
    if (!nodeData) {
      return defaultFillColor
    }

    const { nodeType } = nodeData
    const { nodeColorMapping } = this.props

    const colorMapping = nodeColorMapping[nodeType]

    if (!colorMapping) {
      return defaultFillColor
    }

    const { fillColor } = colorMapping

    if (!fillColor) {
      return defaultFillColor
    }

    return fillColor
  }

  private getNodeX = (d: any) => {
    if (this.isRootNode(d)) {
      return -18
    }
    const areSiblingsLeaves = this.hasSiblings(d) && this.areSiblingsLeaves(d)
    return areSiblingsLeaves ? -18 : 18
  }

  private getNodeY = (d: any) => (d.children || d._children ? 0 : 0)

  private getTextAnchor = (d: any) => {
    if (this.isRootNode(d)) {
      return 'end'
    }
    const areSiblingsLeaves = this.hasSiblings(d) && this.areSiblingsLeaves(d)
    return areSiblingsLeaves ? 'end' : 'start'
  }
  private getTextAnchorPosition = (d: any) => {
    if (this.isRootNode(d)) {
      return -0.35
    }
    const areSiblingsLeaves = this.hasSiblings(d) && this.areSiblingsLeaves(d)
    return areSiblingsLeaves ? -0.35 : 0.35
  }

  private getCrossIcon = (currentNode: any, helperText: string) => {
    const crossIconSvg = currentNode
      .append('svg')
      .attr('viewBox', '0 0 120 180')
      .attr('x', (d: any) => {
        const x1 = this.getNodeX(d)
        return x1 < 0 ? -90 : 0
      })
      .attr('y', helperText ? '10' : '0')
      .attr('id', 'crossIcon')
      .attr('width', 100)
      .attr('height', 100)
      .style('cursor', 'pointer')
      .style('stroke-width', '3')
      .style('stroke-linecap', 'round')
      .style('stroke', baseColors.GREY_DARK)
      .on('click', (d) => {
        if (this.props.onClose) {
          d3.event.stopPropagation()
          currentNode.select('#crossIcon').remove()
          currentNode.select('.helperText').remove()
          currentNode.select('text.detail').attr('dx', `.5em`)
          this.props.onClose(d)
          this.update(d)
        }
      })
    crossIconSvg.append('path').attr('d', 'M16 16 25 25 M25 16 16 25')
  }

  private getShadowedRectangle = (d: any) => {
    const currentNodeID: any = d3.select(`#node-${this.props.data.id}-${d.id}`)
    const d3Node: any = currentNodeID.node()
    const width = d3Node && d3Node.getBBox().width + 57

    // filters go in defs element
    const svg = d3
      .select('g.node')
      .append('svg')
      .attr('class', 'activeDetailRect')
      .attr('width', width)
      .attr('height', 60)
    const defs = svg.append('defs')
    // create filter with id #dropshadow
    // height=500% so that the shadow is not clipped
    const filter = defs
      .append('filter')
      .attr('id', 'dropshadow')
      .attr('height', '500%')
      .attr('width', '500%')

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter
      .append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 5)
    // .attr('result', 'blur')

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter
      .append('feOffset')
      .attr('dx', 0)
      .attr('dy', 10)
      .attr('result', 'offsetblur')

    filter
      .append('feFlood')
      .attr('flood-color', '#000000')
      .attr('flood-opacity', '.1')

    filter
      .append('feComposite')
      .attr('in2', 'offsetblur')
      .attr('operator', 'in')

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    const feMerge = filter.append('feMerge')

    feMerge.append('feMergeNode')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    d3.selectAll(`.rect`).remove()

    currentNodeID
      .append('rect')
      .attr('class', 'activeDetail rect')
      .attr('rx', '5')
      .attr('ry', '5')
      .attr('x', (n: any) => {
        const d3NodeSelector: any = d3
          .select(`#node-${this.props.data.id}-${n.id}`)
          .node()
        const rectwidth = d3NodeSelector.getBBox().width
        const x = this.getNodeX(n)
        return x < 0 ? (rectwidth * 2) / x - rectwidth + 10 : x * 2 - 57
      })
      .attr('y', (n) => this.getNodeY(n) - 30)
      .style('pointer-events', 'none')
      .style('fill', (n: any) => {
        return n.id === d.id ? '#fff' : null
      })
      .attr('width', (n: any) => {
        const d3NodeSelector: any = d3
          .select(`#node-${this.props.data.id}-${n.id}`)
          .node()
        const x = this.getNodeX(n)
        const rectWidth =
          d3NodeSelector.getBBox().width + (x < 0 ? 60 : 0) + x * 2
        return n.id === d.id ? `${rectWidth}px` : '0px'
      })
      .attr('height', (n: any) => {
        return n.id === d.id ? '60px' : '0px'
      })
      .style('filter', (n: any) => {
        return n.id === d.id ? 'url(#dropshadow)' : null
      })
      .moveToBack()
  }

  private resetDetailsClickStyles = () => {
    // Removes existing rectangle box created by onDetailsClick handler
    d3.select('svg.activeDetailRect').remove()
    d3.select('rect.activeDetail').remove()
    d3.select('#crossIcon').remove()
    // // Resets the details text to its original position
    d3.select(`g${this.state.currentClickedId}`)
      .select('text.detail')
      .attr('dx', (dx: any) => {
        const dxCoord = this.getNodeX(dx)
        return dxCoord < 0 ? '-.5em' : '.5em'
      })
  }

  private getCurrentAnchorPositionForClickedNodeTexts = (d: any) => {
    const currentNodeID: any = d3.select(`#node-${this.props.data.id}-${d.id}`)
    currentNodeID
      .select('text')
      .attr('dx', (dx: any) => `${this.getTextAnchorPosition(dx)}em`)
      .attr('dy', (dy: any) => {
        const hasDetailText = dy.data.hasDetailsClick
        const hasDetailAndHelperText =
          dy.data.helperText && dy.data.hasDetailsClick
        return hasDetailText && !hasDetailAndHelperText
          ? '-.25em'
          : hasDetailAndHelperText
          ? '-.5em'
          : '.4em'
      })
      .attr('x', this.getNodeX)
      .attr('y', this.getNodeY)
      .attr('text-anchor', this.getTextAnchor)

    // Displaces the details text to fit the cross icon
    currentNodeID
      .select('text.detail')
      .attr('dx', (dx: any) => {
        const dxCoord = this.getNodeX(dx)
        const buffer = dxCoord < 0 ? 0 : 1.5
        return `${this.getTextAnchorPosition(dx) + buffer}em`
      })
      .attr('x', this.getNodeX)
      .attr('y', this.getNodeY)
      .attr('text-anchor', this.getTextAnchor)

    currentNodeID
      .select('text.helperText')
      .attr('dx', (dx: any) => {
        const dxCoord = this.getNodeX(dx)
        const buffer = dxCoord < 0 ? 0 : 0.45
        return `${this.getTextAnchorPosition(dx) + buffer}em`
      })
      .attr('x', this.getNodeX)
      .attr('y', this.getNodeY)
      .attr('text-anchor', this.getTextAnchor)
  }

  private getClickedNodeDetailsCard = (
    currentNode: any,
    helperText: string
  ) => {
    if (!currentNode.select('.detail').size()) {
      currentNode
        .append('text')
        .attr('class', 'detail')
        .attr('dx', (dx: any) => {
          const dxCoord = this.getNodeX(dx)
          return dxCoord < 0 ? '-.5em' : '.5em'
        })
        .attr('dy', helperText ? '2.3em' : '1.4em')
        .attr('x', this.getNodeX)
        .attr('y', this.getNodeY)
        .attr('text-anchor', this.getTextAnchor)
        .text(() => 'Details')
        .style('font', '11px sans-serif')
        .style('fill', baseColors.BLUE_FIVE)
        .style('cursor', 'pointer')
        .on('click', (d: any) => {
          d3.event.stopPropagation()
          if (this.props.onDetailsClick) {
            this.props.onDetailsClick(d.data)
            // Reset previous click styles
            this.resetDetailsClickStyles()

            const currentNodeID: any = d3.select(
              `#node-${this.props.data.id}-${d.id}`
            )
            this.setState({
              currentClickedId: `#node-${this.props.data.id}-${d.id}`,
            })

            // Get current anchor position of texts for clicked node
            this.getCurrentAnchorPositionForClickedNodeTexts(d)

            // Shows the crossIcon
            this.getCrossIcon(currentNodeID, helperText)

            // Shows the shadowed rectangle
            this.getShadowedRectangle(d)
            // Brings the clicked node elment to the top
            currentNodeID.moveToFront()
          }
        })
    }
  }

  private getHelperTextCard = (currentNode, helperText) => {
    if (!currentNode.select('.helperText').size()) {
      currentNode
        .append('text')
        .attr('class', 'helperText')
        .attr('dx', (dx: any) => {
          const dxCoord = this.getNodeX(dx)
          return dxCoord < 0 ? '-.5em' : '.5em'
        })
        .attr('dy', '.9em')
        .attr('x', this.getNodeX)
        .attr('y', this.getNodeY)
        .attr('text-anchor', this.getTextAnchor)
        .text(() => helperText)
        .style('font', '10px sans-serif')
        .style('pointer-events', 'none')
        .style('fill', baseColors.GREY_DARKER)
    }
  }

  private update = (source: any) => {
    // Assigns the x and y position for the nodes
    const treeData = this.treeMap(this.root)

    // Compute the new tree layout.
    const nodes = treeData.descendants()
    const links = nodes.slice(1)

    // Normalize for fixed-depth.
    nodes.forEach((d: any) => {
      d.y = d.depth * 180
      d.x = d.x * 1.3
    })

    // Update the nodes...
    const node = this.svgG
      .selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++i))

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('id', (n: any) => `node-${this.props.data.id}-${n.id}`)
      .attr('transform', () => `translate(${source.y0},${source.x0})`)
      .on('click', this.click)

    // Add Circle for the nodes
    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', this.getNodeFillColor)
      .style('stroke', this.getNodeStrokeColor)
      .style('stroke-width', '6px')

    // Add labels for the nodes
    nodeEnter
      .append('text')
      .attr('dx', (d) => `${this.getTextAnchorPosition(d)}em`)
      .attr('dy', (d) => {
        const hasDetailText = d.data && d.data.hasDetailsClick
        const hasDetailAndHelperText =
          d.data && d.data.helperText && d.data.hasDetailsClick
        return hasDetailText && !hasDetailAndHelperText
          ? '-.25em'
          : hasDetailAndHelperText
          ? '-.5em'
          : '.4em'
      })
      .attr('x', this.getNodeX)
      .attr('y', this.getNodeY)
      .attr('text-anchor', this.getTextAnchor)
      .text((d: any) => d.data && d.data.name)
      .style('font', '14px sans-serif')
      .style('font-weight', '600')
      .style('font-family', theme.fonts.sourceSansPro)
      .style('fill', baseColors.GREY_DARKER)
      .style('cursor', (d: any) =>
        d.data && d.data.hasNodeTextClick ? 'pointer' : ''
      )
      .on('click', (d: any) => {
        d3.event.stopPropagation()
        if (this.props.onNodeTextClick && d.data && d.data.hasNodeTextClick) {
          this.props.onNodeTextClick!(d.data)
        }
      })

    if (this.props.onDetailsClick) {
      nodes.forEach((d: any) => {
        const currentNode = this.svgG.select(
          `g#node-${this.props.data.id}-${d.id}`
        )
        const helperText = d.data && d.data.helperText
        if (d.data && d.data.hasDetailsClick) {
          this.getClickedNodeDetailsCard(currentNode, helperText)
          if (helperText) {
            this.getHelperTextCard(currentNode, helperText)
          }
        }
      })
    }

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node)

    // Transition to the proper position for the node
    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)

    // Update the node attributes and style
    nodeUpdate
      .select('circle.node')
      .attr('r', 12)
      .style('fill', this.getNodeFillColor)
      .attr('cursor', 'pointer')

    // Remove any exiting nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', (d: any) => `translate(${source.y},${source.x})`)
      .remove()

    // On exit reduce the node circles size to 0
    nodeExit.select('circle').attr('r', 1e-6)

    // On exit reduce the opacity of text labels
    nodeExit.select('text').style('fill-opacity', 1e-6)

    // ****************** links section ***************************

    // Update the links...
    const link = this.svgG.selectAll('path.link').data(links, (d: any) => d.id)

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      })
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '1px')

    // UPDATE
    const linkUpdate = linkEnter.merge(link)

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', (d: any) => diagonal(d, d.parent))

    // Remove any exiting links
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', (d: any) => {
        const o = { x: source.x, y: source.y }
        return diagonal(o, o)
      })
      .remove()

    // Store the old positions for transition.
    nodes.forEach((d: any) => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }
}

export default Tree
