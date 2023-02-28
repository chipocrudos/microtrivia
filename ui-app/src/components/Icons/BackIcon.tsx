import { SVGIconProps } from ".";

export const BackIcon = ({
  className,
  width = "800px",
  height = "800px",
}: SVGIconProps) => {
  return (
    <svg
      viewBox="0 0 32 32"
      width={width}
      height={height}
      className={className}
      fill="currentColor"
    >
      <path d="m14.389 7.956v4.374l1.056 0.01c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zm1.067-2.063-12.795 9.063 12.795 9.063v-5.332c5.121 2e-3 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z" />
    </svg>
  );
};
