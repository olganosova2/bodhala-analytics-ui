/* SystemJS module definition */
interface AppRequire {
  <T>(path: string): T | any;
  (paths: string[], callback: (...modules: any[]) => void): void | any;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, chunkName?: string) => void | any;
  context: any;
}

// tslint:disable-next-line:no-empty-interface
interface NodeRequire extends AppRequire {}
// declare var module: {
//   id: string;
// };
declare var require: NodeRequire;
