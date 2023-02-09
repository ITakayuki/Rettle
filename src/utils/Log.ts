const target = {
  blue: "\x1b[34m",
  normal: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m"
}

type TargetKeyTypes = keyof typeof target;

export const color = new Proxy(target, {
  get: (target, prop: string): (log:string) => void => {
    return (log: string) => {
      return `${prop}${log}\x1b[0m`;
    };
  }
}) as unknown as {[index in TargetKeyTypes]: (log:string) => void};