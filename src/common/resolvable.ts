export class Resolvable<T extends any> {
  reject: (arg?: Error) => void
  resolve: (arg?: T) => void
  promise: Promise<T>

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
