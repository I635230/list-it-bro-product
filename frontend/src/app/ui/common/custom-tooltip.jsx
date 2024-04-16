import { Tooltip } from 'react-tooltip'

export default function CustomTooltip({ content, anchor }) {
  return (
    <div className="tooltip-wrapper">
      <Tooltip
        anchorSelect={`#${anchor}-anchor`}
        content={content}
        place="bottom"
        className="tooltip"
      />
    </div>
  )
}
