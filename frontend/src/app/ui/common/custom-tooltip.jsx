import { Tooltip } from 'react-tooltip'

export default function CustomTooltip({ content, anchor, place }) {
  return (
    <div className="tooltip-wrapper">
      <Tooltip
        anchorSelect={`#${anchor}-anchor`}
        content={content}
        place={place}
        className="tooltip"
      />
    </div>
  )
}
