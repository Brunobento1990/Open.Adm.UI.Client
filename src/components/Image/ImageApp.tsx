interface propsImageApp {
  src: string;
  alt: string;
  className?: string;
  width: number | string;
  height: number | string;
  maxWidth?: string;
  maxHeigth?: string;
  borderRadius?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export function ImageApp(props: propsImageApp) {
  return (
    <img
      alt={props.alt}
      src={props.src}
      width={props.width}
      height={props.height}
      style={{
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeigth,
        borderRadius: props.borderRadius,
        objectFit: props.objectFit
      }}
      loading="lazy"
    />
  );
}
