interface Conf {
  <T>(namespace: string, options?: { [key: string]: any }): Promise<T | undefined>
  sync: <T>(namespace: string, options?: { [key: string]: any }) => T | undefined
  filepath: (conf: any) => string | null
}
declare var conf: Conf;
declare module "pkg-conf" { export = conf }
