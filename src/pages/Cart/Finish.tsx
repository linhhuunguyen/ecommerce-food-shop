import React from "react";

export interface FinishProps {
  info: any;
}

export default function Finish({ info }: FinishProps) {
  return <div>{info.name}</div>;
}
