export default function AnimatedButton({ text, href, onClick, type = 'button', color, size, disabled, style }) {
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      onClick={onClick}
      type={!href ? type : undefined}
      disabled={disabled}
      className={`anim-btn${size ? ` anim-btn--${size}` : ''}`}
      style={{ '--anim-color': color || 'var(--color-primary)', ...style }}
    >
      {text}
    </Tag>
  )
}
