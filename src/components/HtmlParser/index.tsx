import axios from 'axios'
import { Element } from 'domhandler/lib/node'
import DOMPurify from 'dompurify'
import parse, { attributesToProps, domToReact } from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loading } from '..'
import { LoadingWrapper } from '../../containers/TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'

const StyledHtmlBody = styled.div`
  padding: 25px 50px;
  margin-bottom: 1rem;
  font-size: 16px;
  .xn-dateline {
    font-weight: 600;
    font-size: 16px;
  }
  p.xn-distributor {
    margin-bottom: 1.5rem;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
  }
  h2 {
    font-size: 18px;
  }
`

const HtmlParser = ({
  html,
  baseUrl,
  setUrl,
}: {
  html: string | null
  baseUrl: string
  setUrl: any
}) => {
  return (
    <StyledHtmlBody>
      {parse(DOMPurify.sanitize(html) ?? '', {
        replace: (domNode) => {
          if (
            domNode instanceof Element &&
            domNode.name === 'a' &&
            domNode.attribs &&
            domNode.attribs?.href?.startsWith('#')
          ) {
            const props = attributesToProps(domNode.attribs)
            return (
              <a
                {...props}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById(
                    domNode.attribs.href.substring(1)
                  )
                  const root = document.getElementById(
                    'catalyst-viewer-content-body'
                  )
                  if (!root || !target) return
                  const { top } = root.getBoundingClientRect()
                  const { y } = target.getBoundingClientRect()
                  const offset = y - top
                  root.scrollBy({ top: offset - 65 })
                }}
              >
                {domToReact(domNode.children, {})}
              </a>
            )
          } else if (
            domNode instanceof Element &&
            domNode.name === 'a' &&
            domNode.attribs &&
            !domNode.attribs?.href?.startsWith('#') &&
            !domNode.attribs?.href?.startsWith('http://') &&
            !domNode.attribs?.href?.startsWith('https://')
          ) {
            const props = attributesToProps(domNode.attribs)
            return (
              <a
                {...props}
                onClick={(e) => {
                  e.preventDefault()
                  setUrl(baseUrl + domNode.attribs.href)
                }}
              >
                {domToReact(domNode.children, {})}
              </a>
            )
          } else if (
            domNode instanceof Element &&
            domNode.name === 'a' &&
            domNode.attribs &&
            (domNode.attribs?.href?.startsWith('http://') ||
              domNode.attribs?.href?.startsWith('https://'))
          ) {
            domNode.attribs.target = '_blank'
            const props = attributesToProps(domNode.attribs)
            return <a {...props}>{domToReact(domNode.children, {})}</a>
          }
        },
      })}
    </StyledHtmlBody>
  )
}

export default HtmlParser

export const HtmlDocViewer = ({ url, ref }: { ref?: any; url?: any }) => {
  const [docHtml, setDocHtml] = useState<string | null>(null)
  const [isLoadingHtml, setIsLoadingHtml] = useState(false)
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [relativeUrl, setRelativeUrl] = useState<string>('')

  useEffect(() => {
    let isMounted = true
    setIsLoadingHtml(true)

    if (relativeUrl) {
      axios
        .get(relativeUrl)
        .then((res) => {
          if (isMounted) {
            setIsLoadingHtml(false)
            setDocHtml(res.data)
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoadingHtml(false)
          }
        })
    } else if (url) {
      setBaseUrl(url.substring(0, url.lastIndexOf('/') + 1))

      axios
        .get(url)
        .then((res) => {
          if (isMounted) {
            setIsLoadingHtml(false)
            setDocHtml(res.data)
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoadingHtml(false)
          }
        })
    }
    return () => {
      isMounted = false
    }
  }, [url, relativeUrl])

  return isLoadingHtml ? (
    <LoadingWrapper>
      <Loading size={30} />
    </LoadingWrapper>
  ) : (
    <HtmlParser html={docHtml} baseUrl={baseUrl} setUrl={setRelativeUrl} />
  )
}
