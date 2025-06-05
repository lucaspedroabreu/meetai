declare module "simplebar-react" {
  import { Component } from "react";

  interface SimpleBarProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    autoHide?: boolean;
    forceVisible?: boolean | "x" | "y";
    clickOnTrack?: boolean;
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
    direction?: "rtl" | "ltr";
    timeout?: number;
    classNames?: {
      contentEl?: string;
      contentWrapper?: string;
      offset?: string;
      mask?: string;
      wrapper?: string;
      placeholder?: string;
      scrollbar?: string;
      track?: string;
    };
  }

  export default class SimpleBar extends Component<SimpleBarProps> {}
}
