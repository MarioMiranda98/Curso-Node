export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.level = options.level;
    this.message = options.message;
    this.origin = options.origin;
    this.createdAt = new Date();
  }

  public static fromJson = (json: string): LogEntity => {
    json = (json == '') ? '{}' : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    const logEntity = new LogEntity({ message: message, level: level, origin: origin });
    logEntity.createdAt = new Date(createdAt);

    return logEntity;
  }

  public static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({ message: message, level: level, origin: origin, createdAt: createdAt });

    return log;
  }
}