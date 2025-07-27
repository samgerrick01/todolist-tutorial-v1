import { Button } from "antd";

interface ReusableButtonProps {
  onClickValue: () => void;
  label: string;
  type?: "primary" | "default" | "dashed" | "text" | "link";
  className?: string;
}

function ReusableButton({
  onClickValue,
  label,
  type,
  className,
}: ReusableButtonProps) {
  return (
    <Button
      className={className}
      onClick={onClickValue}
      type={type || "primary"}
    >
      {label}
    </Button>
  );
}

export default ReusableButton;
