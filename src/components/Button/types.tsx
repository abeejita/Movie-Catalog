export interface IButton {
  onClick: () => void;
  color: 'blue' | 'gray' | 'red';
  title: string;
  icon?: boolean;
  svg?: string;
  }
