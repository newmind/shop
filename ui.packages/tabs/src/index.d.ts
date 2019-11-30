
import { PureComponent } from "react";


interface ITabContainer {
  readonly to: string | number;
}

interface ITabs {
  readonly name: string | number;
  readonly defaultTab: string;
}

interface ITab {
  readonly caption: string;
  readonly name: string | number;
}


declare module '@ui.packages/tabs' {

  export class TabContainer extends PureComponent<ITabContainer> {}

  export class Tabs extends PureComponent<ITabs> {}

  export class Tab extends PureComponent<ITab> {}

  export function tabsReducer()

  export function setActiveTab()
}
