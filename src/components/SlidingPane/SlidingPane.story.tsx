import React, { useState } from 'react'

import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SlidingPane from '.'
import { baseColors } from '../../constants/colors'

function Wrapper() {
  const [isShowing, setIsShowing] = useState(true)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsShowing(true)}
        disabled={isShowing}
      >
        Show SlidingPane
      </button>
      <SlidingPane
        backgroundColor={baseColors.WHITE}
        isShowing={isShowing}
        onClose={() => setIsShowing(false)}
        hasTags={boolean('Show Slide Pane Tag', true)}
        tagsData={['Tag 1']}
        tagBorderColor={text(
          'Slide Pane Tag Border Color',
          baseColors.YELLOW_ONE
        )}
        tagColor={text('Slide Pane Tag Font Color', baseColors.YELLOW_ONE)}
        tagBgColor={text('Slide Pane Tag Background Color', 'transparent')}
        tagHelperText={text('Show Slide Pane Helper Text', 'Helper Text')}
      >
        <div>some child</div>
      </SlidingPane>
    </div>
  )
}

storiesOf('SlidingPane', module)
  .addDecorator(withKnobs)
  .add('SlidingPane', () => <Wrapper />)
