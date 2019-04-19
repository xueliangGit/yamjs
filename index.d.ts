interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}
type GreetingLike = string | (() => string) | MyGreeter;
declare function _extends(obj:object,oriObj:object): void
declare function greet(g: GreetingLike): void;
declare namespace GreetingLib {
  interface LogOptions {
      verbose?: boolean;
  }
  interface AlertOptions {
      modal: boolean;
      title?: string;
      color?: string;
  }
}