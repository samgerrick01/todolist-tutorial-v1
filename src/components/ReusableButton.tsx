import { Button } from "antd";

interface ReusableButtonProps {
  onClickValue: () => void;
  label: string;
  type?: "primary" | "default" | "dashed" | "text" | "link";
}

function ReusableButton({ onClickValue, label, type }: ReusableButtonProps) {
  return (
    <Button onClick={onClickValue} type={type || "primary"}>
      {label}
    </Button>
  );
}

export default ReusableButton;
