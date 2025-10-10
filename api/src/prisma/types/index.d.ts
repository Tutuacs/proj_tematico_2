
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model BodyPart
 * 
 */
export type BodyPart = $Result.DefaultSelection<Prisma.$BodyPartPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Train
 * 
 */
export type Train = $Result.DefaultSelection<Prisma.$TrainPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const WEEK_DAYS: {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY'
};

export type WEEK_DAYS = (typeof WEEK_DAYS)[keyof typeof WEEK_DAYS]


export const ACTIVITY_TYPE: {
  CARDIO: 'CARDIO',
  STRENGTH: 'STRENGTH',
  FLEXIBILITY: 'FLEXIBILITY',
  BALANCE: 'BALANCE'
};

export type ACTIVITY_TYPE = (typeof ACTIVITY_TYPE)[keyof typeof ACTIVITY_TYPE]

}

export type WEEK_DAYS = $Enums.WEEK_DAYS

export const WEEK_DAYS: typeof $Enums.WEEK_DAYS

export type ACTIVITY_TYPE = $Enums.ACTIVITY_TYPE

export const ACTIVITY_TYPE: typeof $Enums.ACTIVITY_TYPE

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bodyPart`: Exposes CRUD operations for the **BodyPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BodyParts
    * const bodyParts = await prisma.bodyPart.findMany()
    * ```
    */
  get bodyPart(): Prisma.BodyPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.train`: Exposes CRUD operations for the **Train** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trains
    * const trains = await prisma.train.findMany()
    * ```
    */
  get train(): Prisma.TrainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Report: 'Report',
    BodyPart: 'BodyPart',
    Plan: 'Plan',
    Activity: 'Activity',
    Train: 'Train',
    Exercise: 'Exercise'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "report" | "bodyPart" | "plan" | "activity" | "train" | "exercise"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      BodyPart: {
        payload: Prisma.$BodyPartPayload<ExtArgs>
        fields: Prisma.BodyPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BodyPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BodyPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          findFirst: {
            args: Prisma.BodyPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BodyPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          findMany: {
            args: Prisma.BodyPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>[]
          }
          create: {
            args: Prisma.BodyPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          createMany: {
            args: Prisma.BodyPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BodyPartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>[]
          }
          delete: {
            args: Prisma.BodyPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          update: {
            args: Prisma.BodyPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          deleteMany: {
            args: Prisma.BodyPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BodyPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BodyPartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>[]
          }
          upsert: {
            args: Prisma.BodyPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BodyPartPayload>
          }
          aggregate: {
            args: Prisma.BodyPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBodyPart>
          }
          groupBy: {
            args: Prisma.BodyPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<BodyPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.BodyPartCountArgs<ExtArgs>
            result: $Utils.Optional<BodyPartCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Train: {
        payload: Prisma.$TrainPayload<ExtArgs>
        fields: Prisma.TrainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          findFirst: {
            args: Prisma.TrainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          findMany: {
            args: Prisma.TrainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>[]
          }
          create: {
            args: Prisma.TrainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          createMany: {
            args: Prisma.TrainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>[]
          }
          delete: {
            args: Prisma.TrainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          update: {
            args: Prisma.TrainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          deleteMany: {
            args: Prisma.TrainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>[]
          }
          upsert: {
            args: Prisma.TrainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainPayload>
          }
          aggregate: {
            args: Prisma.TrainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrain>
          }
          groupBy: {
            args: Prisma.TrainGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainCountArgs<ExtArgs>
            result: $Utils.Optional<TrainCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    report?: ReportOmit
    bodyPart?: BodyPartOmit
    plan?: PlanOmit
    activity?: ActivityOmit
    train?: TrainOmit
    exercise?: ExerciseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    Trainee: number
    Plans: number
    Report: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainee?: boolean | ProfileCountOutputTypeCountTraineeArgs
    Plans?: boolean | ProfileCountOutputTypeCountPlansArgs
    Report?: boolean | ProfileCountOutputTypeCountReportArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountTraineeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    BodyPart: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BodyPart?: boolean | ReportCountOutputTypeCountBodyPartArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountBodyPartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BodyPartWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    Activity: number
    Train: number
    Report: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Activity?: boolean | PlanCountOutputTypeCountActivityArgs
    Train?: boolean | PlanCountOutputTypeCountTrainArgs
    Report?: boolean | PlanCountOutputTypeCountReportArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountTrainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainWhereInput
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type ActivityCountOutputType
   */

  export type ActivityCountOutputType = {
    Exercise: number
  }

  export type ActivityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Exercise?: boolean | ActivityCountOutputTypeCountExerciseArgs
  }

  // Custom InputTypes
  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCountOutputType
     */
    select?: ActivityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeCountExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }


  /**
   * Count Type TrainCountOutputType
   */

  export type TrainCountOutputType = {
    Exercise: number
  }

  export type TrainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Exercise?: boolean | TrainCountOutputTypeCountExerciseArgs
  }

  // Custom InputTypes
  /**
   * TrainCountOutputType without action
   */
  export type TrainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainCountOutputType
     */
    select?: TrainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainCountOutputType without action
   */
  export type TrainCountOutputTypeCountExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    role: number | null
  }

  export type ProfileSumAggregateOutputType = {
    role: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: number | null
    trainerId: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: number | null
    trainerId: string | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    trainerId: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    role?: true
  }

  export type ProfileSumAggregateInputType = {
    role?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    trainerId?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    trainerId?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    trainerId?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    name: string | null
    email: string
    password: string
    role: number
    trainerId: string | null
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    trainerId?: boolean
    Trainee?: boolean | Profile$TraineeArgs<ExtArgs>
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
    Plans?: boolean | Profile$PlansArgs<ExtArgs>
    Report?: boolean | Profile$ReportArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    trainerId?: boolean
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    trainerId?: boolean
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    trainerId?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "trainerId", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainee?: boolean | Profile$TraineeArgs<ExtArgs>
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
    Plans?: boolean | Profile$PlansArgs<ExtArgs>
    Report?: boolean | Profile$ReportArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainer?: boolean | Profile$TrainerArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      Trainee: Prisma.$ProfilePayload<ExtArgs>[]
      Trainer: Prisma.$ProfilePayload<ExtArgs> | null
      Plans: Prisma.$PlanPayload<ExtArgs>[]
      Report: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      password: string
      role: number
      trainerId: string | null
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Trainee<T extends Profile$TraineeArgs<ExtArgs> = {}>(args?: Subset<T, Profile$TraineeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Trainer<T extends Profile$TrainerArgs<ExtArgs> = {}>(args?: Subset<T, Profile$TrainerArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Plans<T extends Profile$PlansArgs<ExtArgs> = {}>(args?: Subset<T, Profile$PlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Report<T extends Profile$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Profile$ReportArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly name: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly password: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'Int'>
    readonly trainerId: FieldRef<"Profile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.Trainee
   */
  export type Profile$TraineeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    cursor?: ProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile.Trainer
   */
  export type Profile$TrainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * Profile.Plans
   */
  export type Profile$PlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    cursor?: PlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Profile.Report
   */
  export type Profile$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    imc: number | null
    bodyFat: number | null
    weight: number | null
  }

  export type ReportSumAggregateOutputType = {
    imc: number | null
    bodyFat: number | null
    weight: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    content: string | null
    imc: number | null
    bodyFat: number | null
    weight: number | null
    profileId: string | null
    planId: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    content: string | null
    imc: number | null
    bodyFat: number | null
    weight: number | null
    profileId: string | null
    planId: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    createdAt: number
    content: number
    imc: number
    bodyFat: number
    weight: number
    profileId: number
    planId: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    imc?: true
    bodyFat?: true
    weight?: true
  }

  export type ReportSumAggregateInputType = {
    imc?: true
    bodyFat?: true
    weight?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    createdAt?: true
    content?: true
    imc?: true
    bodyFat?: true
    weight?: true
    profileId?: true
    planId?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    createdAt?: true
    content?: true
    imc?: true
    bodyFat?: true
    weight?: true
    profileId?: true
    planId?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    createdAt?: true
    content?: true
    imc?: true
    bodyFat?: true
    weight?: true
    profileId?: true
    planId?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    createdAt: Date
    content: string | null
    imc: number | null
    bodyFat: number | null
    weight: number | null
    profileId: string
    planId: string | null
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    content?: boolean
    imc?: boolean
    bodyFat?: boolean
    weight?: boolean
    profileId?: boolean
    planId?: boolean
    BodyPart?: boolean | Report$BodyPartArgs<ExtArgs>
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    content?: boolean
    imc?: boolean
    bodyFat?: boolean
    weight?: boolean
    profileId?: boolean
    planId?: boolean
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    content?: boolean
    imc?: boolean
    bodyFat?: boolean
    weight?: boolean
    profileId?: boolean
    planId?: boolean
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    createdAt?: boolean
    content?: boolean
    imc?: boolean
    bodyFat?: boolean
    weight?: boolean
    profileId?: boolean
    planId?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "content" | "imc" | "bodyFat" | "weight" | "profileId" | "planId", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BodyPart?: boolean | Report$BodyPartArgs<ExtArgs>
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Profile?: boolean | ProfileDefaultArgs<ExtArgs>
    Plan?: boolean | Report$PlanArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      BodyPart: Prisma.$BodyPartPayload<ExtArgs>[]
      Profile: Prisma.$ProfilePayload<ExtArgs>
      Plan: Prisma.$PlanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      content: string | null
      imc: number | null
      bodyFat: number | null
      weight: number | null
      profileId: string
      planId: string | null
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    BodyPart<T extends Report$BodyPartArgs<ExtArgs> = {}>(args?: Subset<T, Report$BodyPartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Plan<T extends Report$PlanArgs<ExtArgs> = {}>(args?: Subset<T, Report$PlanArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly content: FieldRef<"Report", 'String'>
    readonly imc: FieldRef<"Report", 'Float'>
    readonly bodyFat: FieldRef<"Report", 'Float'>
    readonly weight: FieldRef<"Report", 'Float'>
    readonly profileId: FieldRef<"Report", 'String'>
    readonly planId: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.BodyPart
   */
  export type Report$BodyPartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    where?: BodyPartWhereInput
    orderBy?: BodyPartOrderByWithRelationInput | BodyPartOrderByWithRelationInput[]
    cursor?: BodyPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BodyPartScalarFieldEnum | BodyPartScalarFieldEnum[]
  }

  /**
   * Report.Plan
   */
  export type Report$PlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model BodyPart
   */

  export type AggregateBodyPart = {
    _count: BodyPartCountAggregateOutputType | null
    _avg: BodyPartAvgAggregateOutputType | null
    _sum: BodyPartSumAggregateOutputType | null
    _min: BodyPartMinAggregateOutputType | null
    _max: BodyPartMaxAggregateOutputType | null
  }

  export type BodyPartAvgAggregateOutputType = {
    bodyFat: number | null
  }

  export type BodyPartSumAggregateOutputType = {
    bodyFat: number | null
  }

  export type BodyPartMinAggregateOutputType = {
    id: string | null
    name: string | null
    bodyFat: number | null
    reportId: string | null
  }

  export type BodyPartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    bodyFat: number | null
    reportId: string | null
  }

  export type BodyPartCountAggregateOutputType = {
    id: number
    name: number
    bodyFat: number
    reportId: number
    _all: number
  }


  export type BodyPartAvgAggregateInputType = {
    bodyFat?: true
  }

  export type BodyPartSumAggregateInputType = {
    bodyFat?: true
  }

  export type BodyPartMinAggregateInputType = {
    id?: true
    name?: true
    bodyFat?: true
    reportId?: true
  }

  export type BodyPartMaxAggregateInputType = {
    id?: true
    name?: true
    bodyFat?: true
    reportId?: true
  }

  export type BodyPartCountAggregateInputType = {
    id?: true
    name?: true
    bodyFat?: true
    reportId?: true
    _all?: true
  }

  export type BodyPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BodyPart to aggregate.
     */
    where?: BodyPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BodyParts to fetch.
     */
    orderBy?: BodyPartOrderByWithRelationInput | BodyPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BodyPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BodyParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BodyParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BodyParts
    **/
    _count?: true | BodyPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BodyPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BodyPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BodyPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BodyPartMaxAggregateInputType
  }

  export type GetBodyPartAggregateType<T extends BodyPartAggregateArgs> = {
        [P in keyof T & keyof AggregateBodyPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBodyPart[P]>
      : GetScalarType<T[P], AggregateBodyPart[P]>
  }




  export type BodyPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BodyPartWhereInput
    orderBy?: BodyPartOrderByWithAggregationInput | BodyPartOrderByWithAggregationInput[]
    by: BodyPartScalarFieldEnum[] | BodyPartScalarFieldEnum
    having?: BodyPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BodyPartCountAggregateInputType | true
    _avg?: BodyPartAvgAggregateInputType
    _sum?: BodyPartSumAggregateInputType
    _min?: BodyPartMinAggregateInputType
    _max?: BodyPartMaxAggregateInputType
  }

  export type BodyPartGroupByOutputType = {
    id: string
    name: string
    bodyFat: number | null
    reportId: string
    _count: BodyPartCountAggregateOutputType | null
    _avg: BodyPartAvgAggregateOutputType | null
    _sum: BodyPartSumAggregateOutputType | null
    _min: BodyPartMinAggregateOutputType | null
    _max: BodyPartMaxAggregateOutputType | null
  }

  type GetBodyPartGroupByPayload<T extends BodyPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BodyPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BodyPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BodyPartGroupByOutputType[P]>
            : GetScalarType<T[P], BodyPartGroupByOutputType[P]>
        }
      >
    >


  export type BodyPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bodyFat?: boolean
    reportId?: boolean
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bodyPart"]>

  export type BodyPartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bodyFat?: boolean
    reportId?: boolean
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bodyPart"]>

  export type BodyPartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bodyFat?: boolean
    reportId?: boolean
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bodyPart"]>

  export type BodyPartSelectScalar = {
    id?: boolean
    name?: boolean
    bodyFat?: boolean
    reportId?: boolean
  }

  export type BodyPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "bodyFat" | "reportId", ExtArgs["result"]["bodyPart"]>
  export type BodyPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type BodyPartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type BodyPartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Report?: boolean | ReportDefaultArgs<ExtArgs>
  }

  export type $BodyPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BodyPart"
    objects: {
      Report: Prisma.$ReportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      bodyFat: number | null
      reportId: string
    }, ExtArgs["result"]["bodyPart"]>
    composites: {}
  }

  type BodyPartGetPayload<S extends boolean | null | undefined | BodyPartDefaultArgs> = $Result.GetResult<Prisma.$BodyPartPayload, S>

  type BodyPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BodyPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BodyPartCountAggregateInputType | true
    }

  export interface BodyPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BodyPart'], meta: { name: 'BodyPart' } }
    /**
     * Find zero or one BodyPart that matches the filter.
     * @param {BodyPartFindUniqueArgs} args - Arguments to find a BodyPart
     * @example
     * // Get one BodyPart
     * const bodyPart = await prisma.bodyPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BodyPartFindUniqueArgs>(args: SelectSubset<T, BodyPartFindUniqueArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BodyPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BodyPartFindUniqueOrThrowArgs} args - Arguments to find a BodyPart
     * @example
     * // Get one BodyPart
     * const bodyPart = await prisma.bodyPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BodyPartFindUniqueOrThrowArgs>(args: SelectSubset<T, BodyPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BodyPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartFindFirstArgs} args - Arguments to find a BodyPart
     * @example
     * // Get one BodyPart
     * const bodyPart = await prisma.bodyPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BodyPartFindFirstArgs>(args?: SelectSubset<T, BodyPartFindFirstArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BodyPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartFindFirstOrThrowArgs} args - Arguments to find a BodyPart
     * @example
     * // Get one BodyPart
     * const bodyPart = await prisma.bodyPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BodyPartFindFirstOrThrowArgs>(args?: SelectSubset<T, BodyPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BodyParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BodyParts
     * const bodyParts = await prisma.bodyPart.findMany()
     * 
     * // Get first 10 BodyParts
     * const bodyParts = await prisma.bodyPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bodyPartWithIdOnly = await prisma.bodyPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BodyPartFindManyArgs>(args?: SelectSubset<T, BodyPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BodyPart.
     * @param {BodyPartCreateArgs} args - Arguments to create a BodyPart.
     * @example
     * // Create one BodyPart
     * const BodyPart = await prisma.bodyPart.create({
     *   data: {
     *     // ... data to create a BodyPart
     *   }
     * })
     * 
     */
    create<T extends BodyPartCreateArgs>(args: SelectSubset<T, BodyPartCreateArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BodyParts.
     * @param {BodyPartCreateManyArgs} args - Arguments to create many BodyParts.
     * @example
     * // Create many BodyParts
     * const bodyPart = await prisma.bodyPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BodyPartCreateManyArgs>(args?: SelectSubset<T, BodyPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BodyParts and returns the data saved in the database.
     * @param {BodyPartCreateManyAndReturnArgs} args - Arguments to create many BodyParts.
     * @example
     * // Create many BodyParts
     * const bodyPart = await prisma.bodyPart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BodyParts and only return the `id`
     * const bodyPartWithIdOnly = await prisma.bodyPart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BodyPartCreateManyAndReturnArgs>(args?: SelectSubset<T, BodyPartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BodyPart.
     * @param {BodyPartDeleteArgs} args - Arguments to delete one BodyPart.
     * @example
     * // Delete one BodyPart
     * const BodyPart = await prisma.bodyPart.delete({
     *   where: {
     *     // ... filter to delete one BodyPart
     *   }
     * })
     * 
     */
    delete<T extends BodyPartDeleteArgs>(args: SelectSubset<T, BodyPartDeleteArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BodyPart.
     * @param {BodyPartUpdateArgs} args - Arguments to update one BodyPart.
     * @example
     * // Update one BodyPart
     * const bodyPart = await prisma.bodyPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BodyPartUpdateArgs>(args: SelectSubset<T, BodyPartUpdateArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BodyParts.
     * @param {BodyPartDeleteManyArgs} args - Arguments to filter BodyParts to delete.
     * @example
     * // Delete a few BodyParts
     * const { count } = await prisma.bodyPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BodyPartDeleteManyArgs>(args?: SelectSubset<T, BodyPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BodyParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BodyParts
     * const bodyPart = await prisma.bodyPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BodyPartUpdateManyArgs>(args: SelectSubset<T, BodyPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BodyParts and returns the data updated in the database.
     * @param {BodyPartUpdateManyAndReturnArgs} args - Arguments to update many BodyParts.
     * @example
     * // Update many BodyParts
     * const bodyPart = await prisma.bodyPart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BodyParts and only return the `id`
     * const bodyPartWithIdOnly = await prisma.bodyPart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BodyPartUpdateManyAndReturnArgs>(args: SelectSubset<T, BodyPartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BodyPart.
     * @param {BodyPartUpsertArgs} args - Arguments to update or create a BodyPart.
     * @example
     * // Update or create a BodyPart
     * const bodyPart = await prisma.bodyPart.upsert({
     *   create: {
     *     // ... data to create a BodyPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BodyPart we want to update
     *   }
     * })
     */
    upsert<T extends BodyPartUpsertArgs>(args: SelectSubset<T, BodyPartUpsertArgs<ExtArgs>>): Prisma__BodyPartClient<$Result.GetResult<Prisma.$BodyPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BodyParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartCountArgs} args - Arguments to filter BodyParts to count.
     * @example
     * // Count the number of BodyParts
     * const count = await prisma.bodyPart.count({
     *   where: {
     *     // ... the filter for the BodyParts we want to count
     *   }
     * })
    **/
    count<T extends BodyPartCountArgs>(
      args?: Subset<T, BodyPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BodyPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BodyPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BodyPartAggregateArgs>(args: Subset<T, BodyPartAggregateArgs>): Prisma.PrismaPromise<GetBodyPartAggregateType<T>>

    /**
     * Group by BodyPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BodyPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BodyPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BodyPartGroupByArgs['orderBy'] }
        : { orderBy?: BodyPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BodyPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBodyPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BodyPart model
   */
  readonly fields: BodyPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BodyPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BodyPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BodyPart model
   */
  interface BodyPartFieldRefs {
    readonly id: FieldRef<"BodyPart", 'String'>
    readonly name: FieldRef<"BodyPart", 'String'>
    readonly bodyFat: FieldRef<"BodyPart", 'Float'>
    readonly reportId: FieldRef<"BodyPart", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BodyPart findUnique
   */
  export type BodyPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter, which BodyPart to fetch.
     */
    where: BodyPartWhereUniqueInput
  }

  /**
   * BodyPart findUniqueOrThrow
   */
  export type BodyPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter, which BodyPart to fetch.
     */
    where: BodyPartWhereUniqueInput
  }

  /**
   * BodyPart findFirst
   */
  export type BodyPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter, which BodyPart to fetch.
     */
    where?: BodyPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BodyParts to fetch.
     */
    orderBy?: BodyPartOrderByWithRelationInput | BodyPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BodyParts.
     */
    cursor?: BodyPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BodyParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BodyParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BodyParts.
     */
    distinct?: BodyPartScalarFieldEnum | BodyPartScalarFieldEnum[]
  }

  /**
   * BodyPart findFirstOrThrow
   */
  export type BodyPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter, which BodyPart to fetch.
     */
    where?: BodyPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BodyParts to fetch.
     */
    orderBy?: BodyPartOrderByWithRelationInput | BodyPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BodyParts.
     */
    cursor?: BodyPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BodyParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BodyParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BodyParts.
     */
    distinct?: BodyPartScalarFieldEnum | BodyPartScalarFieldEnum[]
  }

  /**
   * BodyPart findMany
   */
  export type BodyPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter, which BodyParts to fetch.
     */
    where?: BodyPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BodyParts to fetch.
     */
    orderBy?: BodyPartOrderByWithRelationInput | BodyPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BodyParts.
     */
    cursor?: BodyPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BodyParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BodyParts.
     */
    skip?: number
    distinct?: BodyPartScalarFieldEnum | BodyPartScalarFieldEnum[]
  }

  /**
   * BodyPart create
   */
  export type BodyPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * The data needed to create a BodyPart.
     */
    data: XOR<BodyPartCreateInput, BodyPartUncheckedCreateInput>
  }

  /**
   * BodyPart createMany
   */
  export type BodyPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BodyParts.
     */
    data: BodyPartCreateManyInput | BodyPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BodyPart createManyAndReturn
   */
  export type BodyPartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * The data used to create many BodyParts.
     */
    data: BodyPartCreateManyInput | BodyPartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BodyPart update
   */
  export type BodyPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * The data needed to update a BodyPart.
     */
    data: XOR<BodyPartUpdateInput, BodyPartUncheckedUpdateInput>
    /**
     * Choose, which BodyPart to update.
     */
    where: BodyPartWhereUniqueInput
  }

  /**
   * BodyPart updateMany
   */
  export type BodyPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BodyParts.
     */
    data: XOR<BodyPartUpdateManyMutationInput, BodyPartUncheckedUpdateManyInput>
    /**
     * Filter which BodyParts to update
     */
    where?: BodyPartWhereInput
    /**
     * Limit how many BodyParts to update.
     */
    limit?: number
  }

  /**
   * BodyPart updateManyAndReturn
   */
  export type BodyPartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * The data used to update BodyParts.
     */
    data: XOR<BodyPartUpdateManyMutationInput, BodyPartUncheckedUpdateManyInput>
    /**
     * Filter which BodyParts to update
     */
    where?: BodyPartWhereInput
    /**
     * Limit how many BodyParts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BodyPart upsert
   */
  export type BodyPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * The filter to search for the BodyPart to update in case it exists.
     */
    where: BodyPartWhereUniqueInput
    /**
     * In case the BodyPart found by the `where` argument doesn't exist, create a new BodyPart with this data.
     */
    create: XOR<BodyPartCreateInput, BodyPartUncheckedCreateInput>
    /**
     * In case the BodyPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BodyPartUpdateInput, BodyPartUncheckedUpdateInput>
  }

  /**
   * BodyPart delete
   */
  export type BodyPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
    /**
     * Filter which BodyPart to delete.
     */
    where: BodyPartWhereUniqueInput
  }

  /**
   * BodyPart deleteMany
   */
  export type BodyPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BodyParts to delete
     */
    where?: BodyPartWhereInput
    /**
     * Limit how many BodyParts to delete.
     */
    limit?: number
  }

  /**
   * BodyPart without action
   */
  export type BodyPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BodyPart
     */
    select?: BodyPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BodyPart
     */
    omit?: BodyPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BodyPartInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    from: Date | null
    to: Date | null
    weekDay: $Enums.WEEK_DAYS | null
    trainerId: string | null
    traineeId: string | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    from: Date | null
    to: Date | null
    weekDay: $Enums.WEEK_DAYS | null
    trainerId: string | null
    traineeId: string | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    title: number
    description: number
    from: number
    to: number
    weekDay: number
    trainerId: number
    traineeId: number
    _all: number
  }


  export type PlanMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    from?: true
    to?: true
    weekDay?: true
    trainerId?: true
    traineeId?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    from?: true
    to?: true
    weekDay?: true
    trainerId?: true
    traineeId?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    from?: true
    to?: true
    weekDay?: true
    trainerId?: true
    traineeId?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    title: string
    description: string | null
    from: Date
    to: Date
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
    _count: PlanCountAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    from?: boolean
    to?: boolean
    weekDay?: boolean
    trainerId?: boolean
    traineeId?: boolean
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
    Activity?: boolean | Plan$ActivityArgs<ExtArgs>
    Train?: boolean | Plan$TrainArgs<ExtArgs>
    Report?: boolean | Plan$ReportArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    from?: boolean
    to?: boolean
    weekDay?: boolean
    trainerId?: boolean
    traineeId?: boolean
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    from?: boolean
    to?: boolean
    weekDay?: boolean
    trainerId?: boolean
    traineeId?: boolean
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    from?: boolean
    to?: boolean
    weekDay?: boolean
    trainerId?: boolean
    traineeId?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "from" | "to" | "weekDay" | "trainerId" | "traineeId", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
    Activity?: boolean | Plan$ActivityArgs<ExtArgs>
    Train?: boolean | Plan$TrainArgs<ExtArgs>
    Report?: boolean | Plan$ReportArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Trainee?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      Trainee: Prisma.$ProfilePayload<ExtArgs>
      Activity: Prisma.$ActivityPayload<ExtArgs>[]
      Train: Prisma.$TrainPayload<ExtArgs>[]
      Report: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      from: Date
      to: Date
      weekDay: $Enums.WEEK_DAYS
      trainerId: string
      traineeId: string
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Trainee<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Activity<T extends Plan$ActivityArgs<ExtArgs> = {}>(args?: Subset<T, Plan$ActivityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Train<T extends Plan$TrainArgs<ExtArgs> = {}>(args?: Subset<T, Plan$TrainArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Report<T extends Plan$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Plan$ReportArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly title: FieldRef<"Plan", 'String'>
    readonly description: FieldRef<"Plan", 'String'>
    readonly from: FieldRef<"Plan", 'DateTime'>
    readonly to: FieldRef<"Plan", 'DateTime'>
    readonly weekDay: FieldRef<"Plan", 'WEEK_DAYS'>
    readonly trainerId: FieldRef<"Plan", 'String'>
    readonly traineeId: FieldRef<"Plan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.Activity
   */
  export type Plan$ActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Plan.Train
   */
  export type Plan$TrainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    where?: TrainWhereInput
    orderBy?: TrainOrderByWithRelationInput | TrainOrderByWithRelationInput[]
    cursor?: TrainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainScalarFieldEnum | TrainScalarFieldEnum[]
  }

  /**
   * Plan.Report
   */
  export type Plan$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
  }

  export type ActivitySumAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    name: string | null
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE | null
    description: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    planId: string | null
    reportExerciseId: string | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE | null
    description: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    planId: string | null
    reportExerciseId: string | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    name: number
    ACTIVITY_TYPE: number
    description: number
    weight: number
    reps: number
    sets: number
    duration: number
    planId: number
    reportExerciseId: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
    duration?: true
  }

  export type ActivitySumAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
    duration?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    name?: true
    ACTIVITY_TYPE?: true
    description?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    planId?: true
    reportExerciseId?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    name?: true
    ACTIVITY_TYPE?: true
    description?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    planId?: true
    reportExerciseId?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    name?: true
    ACTIVITY_TYPE?: true
    description?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    planId?: true
    reportExerciseId?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    planId: string
    reportExerciseId: string | null
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ACTIVITY_TYPE?: boolean
    description?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    planId?: boolean
    reportExerciseId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
    Exercise?: boolean | Activity$ExerciseArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ACTIVITY_TYPE?: boolean
    description?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    planId?: boolean
    reportExerciseId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ACTIVITY_TYPE?: boolean
    description?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    planId?: boolean
    reportExerciseId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    name?: boolean
    ACTIVITY_TYPE?: boolean
    description?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    planId?: boolean
    reportExerciseId?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "ACTIVITY_TYPE" | "description" | "weight" | "reps" | "sets" | "duration" | "planId" | "reportExerciseId", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
    Exercise?: boolean | Activity$ExerciseArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      Plan: Prisma.$PlanPayload<ExtArgs>
      Exercise: Prisma.$ExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
      description: string | null
      weight: number | null
      reps: number | null
      sets: number | null
      duration: number | null
      planId: string
      reportExerciseId: string | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Exercise<T extends Activity$ExerciseArgs<ExtArgs> = {}>(args?: Subset<T, Activity$ExerciseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly name: FieldRef<"Activity", 'String'>
    readonly ACTIVITY_TYPE: FieldRef<"Activity", 'ACTIVITY_TYPE'>
    readonly description: FieldRef<"Activity", 'String'>
    readonly weight: FieldRef<"Activity", 'Float'>
    readonly reps: FieldRef<"Activity", 'Int'>
    readonly sets: FieldRef<"Activity", 'Int'>
    readonly duration: FieldRef<"Activity", 'Int'>
    readonly planId: FieldRef<"Activity", 'String'>
    readonly reportExerciseId: FieldRef<"Activity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.Exercise
   */
  export type Activity$ExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Train
   */

  export type AggregateTrain = {
    _count: TrainCountAggregateOutputType | null
    _min: TrainMinAggregateOutputType | null
    _max: TrainMaxAggregateOutputType | null
  }

  export type TrainMinAggregateOutputType = {
    id: string | null
    from: Date | null
    to: Date | null
    planId: string | null
  }

  export type TrainMaxAggregateOutputType = {
    id: string | null
    from: Date | null
    to: Date | null
    planId: string | null
  }

  export type TrainCountAggregateOutputType = {
    id: number
    from: number
    to: number
    planId: number
    _all: number
  }


  export type TrainMinAggregateInputType = {
    id?: true
    from?: true
    to?: true
    planId?: true
  }

  export type TrainMaxAggregateInputType = {
    id?: true
    from?: true
    to?: true
    planId?: true
  }

  export type TrainCountAggregateInputType = {
    id?: true
    from?: true
    to?: true
    planId?: true
    _all?: true
  }

  export type TrainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Train to aggregate.
     */
    where?: TrainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trains to fetch.
     */
    orderBy?: TrainOrderByWithRelationInput | TrainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trains
    **/
    _count?: true | TrainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainMaxAggregateInputType
  }

  export type GetTrainAggregateType<T extends TrainAggregateArgs> = {
        [P in keyof T & keyof AggregateTrain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrain[P]>
      : GetScalarType<T[P], AggregateTrain[P]>
  }




  export type TrainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainWhereInput
    orderBy?: TrainOrderByWithAggregationInput | TrainOrderByWithAggregationInput[]
    by: TrainScalarFieldEnum[] | TrainScalarFieldEnum
    having?: TrainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainCountAggregateInputType | true
    _min?: TrainMinAggregateInputType
    _max?: TrainMaxAggregateInputType
  }

  export type TrainGroupByOutputType = {
    id: string
    from: Date
    to: Date
    planId: string
    _count: TrainCountAggregateOutputType | null
    _min: TrainMinAggregateOutputType | null
    _max: TrainMaxAggregateOutputType | null
  }

  type GetTrainGroupByPayload<T extends TrainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainGroupByOutputType[P]>
            : GetScalarType<T[P], TrainGroupByOutputType[P]>
        }
      >
    >


  export type TrainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from?: boolean
    to?: boolean
    planId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
    Exercise?: boolean | Train$ExerciseArgs<ExtArgs>
    _count?: boolean | TrainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["train"]>

  export type TrainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from?: boolean
    to?: boolean
    planId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["train"]>

  export type TrainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from?: boolean
    to?: boolean
    planId?: boolean
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["train"]>

  export type TrainSelectScalar = {
    id?: boolean
    from?: boolean
    to?: boolean
    planId?: boolean
  }

  export type TrainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "from" | "to" | "planId", ExtArgs["result"]["train"]>
  export type TrainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
    Exercise?: boolean | Train$ExerciseArgs<ExtArgs>
    _count?: boolean | TrainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type TrainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $TrainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Train"
    objects: {
      Plan: Prisma.$PlanPayload<ExtArgs>
      Exercise: Prisma.$ExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      from: Date
      to: Date
      planId: string
    }, ExtArgs["result"]["train"]>
    composites: {}
  }

  type TrainGetPayload<S extends boolean | null | undefined | TrainDefaultArgs> = $Result.GetResult<Prisma.$TrainPayload, S>

  type TrainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainCountAggregateInputType | true
    }

  export interface TrainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Train'], meta: { name: 'Train' } }
    /**
     * Find zero or one Train that matches the filter.
     * @param {TrainFindUniqueArgs} args - Arguments to find a Train
     * @example
     * // Get one Train
     * const train = await prisma.train.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainFindUniqueArgs>(args: SelectSubset<T, TrainFindUniqueArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Train that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainFindUniqueOrThrowArgs} args - Arguments to find a Train
     * @example
     * // Get one Train
     * const train = await prisma.train.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Train that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainFindFirstArgs} args - Arguments to find a Train
     * @example
     * // Get one Train
     * const train = await prisma.train.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainFindFirstArgs>(args?: SelectSubset<T, TrainFindFirstArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Train that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainFindFirstOrThrowArgs} args - Arguments to find a Train
     * @example
     * // Get one Train
     * const train = await prisma.train.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trains
     * const trains = await prisma.train.findMany()
     * 
     * // Get first 10 Trains
     * const trains = await prisma.train.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainWithIdOnly = await prisma.train.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainFindManyArgs>(args?: SelectSubset<T, TrainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Train.
     * @param {TrainCreateArgs} args - Arguments to create a Train.
     * @example
     * // Create one Train
     * const Train = await prisma.train.create({
     *   data: {
     *     // ... data to create a Train
     *   }
     * })
     * 
     */
    create<T extends TrainCreateArgs>(args: SelectSubset<T, TrainCreateArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trains.
     * @param {TrainCreateManyArgs} args - Arguments to create many Trains.
     * @example
     * // Create many Trains
     * const train = await prisma.train.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainCreateManyArgs>(args?: SelectSubset<T, TrainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trains and returns the data saved in the database.
     * @param {TrainCreateManyAndReturnArgs} args - Arguments to create many Trains.
     * @example
     * // Create many Trains
     * const train = await prisma.train.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trains and only return the `id`
     * const trainWithIdOnly = await prisma.train.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Train.
     * @param {TrainDeleteArgs} args - Arguments to delete one Train.
     * @example
     * // Delete one Train
     * const Train = await prisma.train.delete({
     *   where: {
     *     // ... filter to delete one Train
     *   }
     * })
     * 
     */
    delete<T extends TrainDeleteArgs>(args: SelectSubset<T, TrainDeleteArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Train.
     * @param {TrainUpdateArgs} args - Arguments to update one Train.
     * @example
     * // Update one Train
     * const train = await prisma.train.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainUpdateArgs>(args: SelectSubset<T, TrainUpdateArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trains.
     * @param {TrainDeleteManyArgs} args - Arguments to filter Trains to delete.
     * @example
     * // Delete a few Trains
     * const { count } = await prisma.train.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainDeleteManyArgs>(args?: SelectSubset<T, TrainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trains
     * const train = await prisma.train.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainUpdateManyArgs>(args: SelectSubset<T, TrainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trains and returns the data updated in the database.
     * @param {TrainUpdateManyAndReturnArgs} args - Arguments to update many Trains.
     * @example
     * // Update many Trains
     * const train = await prisma.train.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trains and only return the `id`
     * const trainWithIdOnly = await prisma.train.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Train.
     * @param {TrainUpsertArgs} args - Arguments to update or create a Train.
     * @example
     * // Update or create a Train
     * const train = await prisma.train.upsert({
     *   create: {
     *     // ... data to create a Train
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Train we want to update
     *   }
     * })
     */
    upsert<T extends TrainUpsertArgs>(args: SelectSubset<T, TrainUpsertArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainCountArgs} args - Arguments to filter Trains to count.
     * @example
     * // Count the number of Trains
     * const count = await prisma.train.count({
     *   where: {
     *     // ... the filter for the Trains we want to count
     *   }
     * })
    **/
    count<T extends TrainCountArgs>(
      args?: Subset<T, TrainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Train.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainAggregateArgs>(args: Subset<T, TrainAggregateArgs>): Prisma.PrismaPromise<GetTrainAggregateType<T>>

    /**
     * Group by Train.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainGroupByArgs['orderBy'] }
        : { orderBy?: TrainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Train model
   */
  readonly fields: TrainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Train.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Exercise<T extends Train$ExerciseArgs<ExtArgs> = {}>(args?: Subset<T, Train$ExerciseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Train model
   */
  interface TrainFieldRefs {
    readonly id: FieldRef<"Train", 'String'>
    readonly from: FieldRef<"Train", 'DateTime'>
    readonly to: FieldRef<"Train", 'DateTime'>
    readonly planId: FieldRef<"Train", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Train findUnique
   */
  export type TrainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter, which Train to fetch.
     */
    where: TrainWhereUniqueInput
  }

  /**
   * Train findUniqueOrThrow
   */
  export type TrainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter, which Train to fetch.
     */
    where: TrainWhereUniqueInput
  }

  /**
   * Train findFirst
   */
  export type TrainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter, which Train to fetch.
     */
    where?: TrainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trains to fetch.
     */
    orderBy?: TrainOrderByWithRelationInput | TrainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trains.
     */
    cursor?: TrainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trains.
     */
    distinct?: TrainScalarFieldEnum | TrainScalarFieldEnum[]
  }

  /**
   * Train findFirstOrThrow
   */
  export type TrainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter, which Train to fetch.
     */
    where?: TrainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trains to fetch.
     */
    orderBy?: TrainOrderByWithRelationInput | TrainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trains.
     */
    cursor?: TrainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trains.
     */
    distinct?: TrainScalarFieldEnum | TrainScalarFieldEnum[]
  }

  /**
   * Train findMany
   */
  export type TrainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter, which Trains to fetch.
     */
    where?: TrainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trains to fetch.
     */
    orderBy?: TrainOrderByWithRelationInput | TrainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trains.
     */
    cursor?: TrainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trains.
     */
    skip?: number
    distinct?: TrainScalarFieldEnum | TrainScalarFieldEnum[]
  }

  /**
   * Train create
   */
  export type TrainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * The data needed to create a Train.
     */
    data: XOR<TrainCreateInput, TrainUncheckedCreateInput>
  }

  /**
   * Train createMany
   */
  export type TrainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trains.
     */
    data: TrainCreateManyInput | TrainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Train createManyAndReturn
   */
  export type TrainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * The data used to create many Trains.
     */
    data: TrainCreateManyInput | TrainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Train update
   */
  export type TrainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * The data needed to update a Train.
     */
    data: XOR<TrainUpdateInput, TrainUncheckedUpdateInput>
    /**
     * Choose, which Train to update.
     */
    where: TrainWhereUniqueInput
  }

  /**
   * Train updateMany
   */
  export type TrainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trains.
     */
    data: XOR<TrainUpdateManyMutationInput, TrainUncheckedUpdateManyInput>
    /**
     * Filter which Trains to update
     */
    where?: TrainWhereInput
    /**
     * Limit how many Trains to update.
     */
    limit?: number
  }

  /**
   * Train updateManyAndReturn
   */
  export type TrainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * The data used to update Trains.
     */
    data: XOR<TrainUpdateManyMutationInput, TrainUncheckedUpdateManyInput>
    /**
     * Filter which Trains to update
     */
    where?: TrainWhereInput
    /**
     * Limit how many Trains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Train upsert
   */
  export type TrainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * The filter to search for the Train to update in case it exists.
     */
    where: TrainWhereUniqueInput
    /**
     * In case the Train found by the `where` argument doesn't exist, create a new Train with this data.
     */
    create: XOR<TrainCreateInput, TrainUncheckedCreateInput>
    /**
     * In case the Train was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainUpdateInput, TrainUncheckedUpdateInput>
  }

  /**
   * Train delete
   */
  export type TrainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
    /**
     * Filter which Train to delete.
     */
    where: TrainWhereUniqueInput
  }

  /**
   * Train deleteMany
   */
  export type TrainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trains to delete
     */
    where?: TrainWhereInput
    /**
     * Limit how many Trains to delete.
     */
    limit?: number
  }

  /**
   * Train.Exercise
   */
  export type Train$ExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Train without action
   */
  export type TrainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Train
     */
    select?: TrainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Train
     */
    omit?: TrainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseAvgAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
  }

  export type ExerciseSumAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    description: string | null
    activityId: string | null
    trainId: string | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    description: string | null
    activityId: string | null
    trainId: string | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    weight: number
    reps: number
    sets: number
    duration: number
    description: number
    activityId: number
    trainId: number
    _all: number
  }


  export type ExerciseAvgAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
    duration?: true
  }

  export type ExerciseSumAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
    duration?: true
  }

  export type ExerciseMinAggregateInputType = {
    id?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    description?: true
    activityId?: true
    trainId?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    description?: true
    activityId?: true
    trainId?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    weight?: true
    reps?: true
    sets?: true
    duration?: true
    description?: true
    activityId?: true
    trainId?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _avg?: ExerciseAvgAggregateInputType
    _sum?: ExerciseSumAggregateInputType
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    weight: number | null
    reps: number | null
    sets: number | null
    duration: number | null
    description: string | null
    activityId: string
    trainId: string
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    description?: boolean
    activityId?: boolean
    trainId?: boolean
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    description?: boolean
    activityId?: boolean
    trainId?: boolean
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    description?: boolean
    activityId?: boolean
    trainId?: boolean
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    duration?: boolean
    description?: boolean
    activityId?: boolean
    trainId?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "weight" | "reps" | "sets" | "duration" | "description" | "activityId" | "trainId", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Activity?: boolean | ActivityDefaultArgs<ExtArgs>
    Train?: boolean | TrainDefaultArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      Activity: Prisma.$ActivityPayload<ExtArgs>
      Train: Prisma.$TrainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      weight: number | null
      reps: number | null
      sets: number | null
      duration: number | null
      description: string | null
      activityId: string
      trainId: string
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Activity<T extends ActivityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ActivityDefaultArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Train<T extends TrainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainDefaultArgs<ExtArgs>>): Prisma__TrainClient<$Result.GetResult<Prisma.$TrainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly weight: FieldRef<"Exercise", 'Float'>
    readonly reps: FieldRef<"Exercise", 'Int'>
    readonly sets: FieldRef<"Exercise", 'Int'>
    readonly duration: FieldRef<"Exercise", 'Int'>
    readonly description: FieldRef<"Exercise", 'String'>
    readonly activityId: FieldRef<"Exercise", 'String'>
    readonly trainId: FieldRef<"Exercise", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    trainerId: 'trainerId'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    content: 'content',
    imc: 'imc',
    bodyFat: 'bodyFat',
    weight: 'weight',
    profileId: 'profileId',
    planId: 'planId'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const BodyPartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    bodyFat: 'bodyFat',
    reportId: 'reportId'
  };

  export type BodyPartScalarFieldEnum = (typeof BodyPartScalarFieldEnum)[keyof typeof BodyPartScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    from: 'from',
    to: 'to',
    weekDay: 'weekDay',
    trainerId: 'trainerId',
    traineeId: 'traineeId'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    ACTIVITY_TYPE: 'ACTIVITY_TYPE',
    description: 'description',
    weight: 'weight',
    reps: 'reps',
    sets: 'sets',
    duration: 'duration',
    planId: 'planId',
    reportExerciseId: 'reportExerciseId'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const TrainScalarFieldEnum: {
    id: 'id',
    from: 'from',
    to: 'to',
    planId: 'planId'
  };

  export type TrainScalarFieldEnum = (typeof TrainScalarFieldEnum)[keyof typeof TrainScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    weight: 'weight',
    reps: 'reps',
    sets: 'sets',
    duration: 'duration',
    description: 'description',
    activityId: 'activityId',
    trainId: 'trainId'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'WEEK_DAYS'
   */
  export type EnumWEEK_DAYSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WEEK_DAYS'>
    


  /**
   * Reference to a field of type 'WEEK_DAYS[]'
   */
  export type ListEnumWEEK_DAYSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WEEK_DAYS[]'>
    


  /**
   * Reference to a field of type 'ACTIVITY_TYPE'
   */
  export type EnumACTIVITY_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ACTIVITY_TYPE'>
    


  /**
   * Reference to a field of type 'ACTIVITY_TYPE[]'
   */
  export type ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ACTIVITY_TYPE[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    name?: StringNullableFilter<"Profile"> | string | null
    email?: StringFilter<"Profile"> | string
    password?: StringFilter<"Profile"> | string
    role?: IntFilter<"Profile"> | number
    trainerId?: StringNullableFilter<"Profile"> | string | null
    Trainee?: ProfileListRelationFilter
    Trainer?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    Plans?: PlanListRelationFilter
    Report?: ReportListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    Trainee?: ProfileOrderByRelationAggregateInput
    Trainer?: ProfileOrderByWithRelationInput
    Plans?: PlanOrderByRelationAggregateInput
    Report?: ReportOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    name?: StringNullableFilter<"Profile"> | string | null
    password?: StringFilter<"Profile"> | string
    role?: IntFilter<"Profile"> | number
    trainerId?: StringNullableFilter<"Profile"> | string | null
    Trainee?: ProfileListRelationFilter
    Trainer?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    Plans?: PlanListRelationFilter
    Report?: ReportListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    name?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    email?: StringWithAggregatesFilter<"Profile"> | string
    password?: StringWithAggregatesFilter<"Profile"> | string
    role?: IntWithAggregatesFilter<"Profile"> | number
    trainerId?: StringNullableWithAggregatesFilter<"Profile"> | string | null
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    content?: StringNullableFilter<"Report"> | string | null
    imc?: FloatNullableFilter<"Report"> | number | null
    bodyFat?: FloatNullableFilter<"Report"> | number | null
    weight?: FloatNullableFilter<"Report"> | number | null
    profileId?: StringFilter<"Report"> | string
    planId?: StringNullableFilter<"Report"> | string | null
    BodyPart?: BodyPartListRelationFilter
    Profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    Plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    content?: SortOrderInput | SortOrder
    imc?: SortOrderInput | SortOrder
    bodyFat?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    profileId?: SortOrder
    planId?: SortOrderInput | SortOrder
    BodyPart?: BodyPartOrderByRelationAggregateInput
    Profile?: ProfileOrderByWithRelationInput
    Plan?: PlanOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    createdAt?: DateTimeFilter<"Report"> | Date | string
    content?: StringNullableFilter<"Report"> | string | null
    imc?: FloatNullableFilter<"Report"> | number | null
    bodyFat?: FloatNullableFilter<"Report"> | number | null
    weight?: FloatNullableFilter<"Report"> | number | null
    profileId?: StringFilter<"Report"> | string
    planId?: StringNullableFilter<"Report"> | string | null
    BodyPart?: BodyPartListRelationFilter
    Profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    Plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    content?: SortOrderInput | SortOrder
    imc?: SortOrderInput | SortOrder
    bodyFat?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    profileId?: SortOrder
    planId?: SortOrderInput | SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    content?: StringNullableWithAggregatesFilter<"Report"> | string | null
    imc?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    bodyFat?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    profileId?: StringWithAggregatesFilter<"Report"> | string
    planId?: StringNullableWithAggregatesFilter<"Report"> | string | null
  }

  export type BodyPartWhereInput = {
    AND?: BodyPartWhereInput | BodyPartWhereInput[]
    OR?: BodyPartWhereInput[]
    NOT?: BodyPartWhereInput | BodyPartWhereInput[]
    id?: StringFilter<"BodyPart"> | string
    name?: StringFilter<"BodyPart"> | string
    bodyFat?: FloatNullableFilter<"BodyPart"> | number | null
    reportId?: StringFilter<"BodyPart"> | string
    Report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }

  export type BodyPartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    bodyFat?: SortOrderInput | SortOrder
    reportId?: SortOrder
    Report?: ReportOrderByWithRelationInput
  }

  export type BodyPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BodyPartWhereInput | BodyPartWhereInput[]
    OR?: BodyPartWhereInput[]
    NOT?: BodyPartWhereInput | BodyPartWhereInput[]
    name?: StringFilter<"BodyPart"> | string
    bodyFat?: FloatNullableFilter<"BodyPart"> | number | null
    reportId?: StringFilter<"BodyPart"> | string
    Report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }, "id">

  export type BodyPartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    bodyFat?: SortOrderInput | SortOrder
    reportId?: SortOrder
    _count?: BodyPartCountOrderByAggregateInput
    _avg?: BodyPartAvgOrderByAggregateInput
    _max?: BodyPartMaxOrderByAggregateInput
    _min?: BodyPartMinOrderByAggregateInput
    _sum?: BodyPartSumOrderByAggregateInput
  }

  export type BodyPartScalarWhereWithAggregatesInput = {
    AND?: BodyPartScalarWhereWithAggregatesInput | BodyPartScalarWhereWithAggregatesInput[]
    OR?: BodyPartScalarWhereWithAggregatesInput[]
    NOT?: BodyPartScalarWhereWithAggregatesInput | BodyPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BodyPart"> | string
    name?: StringWithAggregatesFilter<"BodyPart"> | string
    bodyFat?: FloatNullableWithAggregatesFilter<"BodyPart"> | number | null
    reportId?: StringWithAggregatesFilter<"BodyPart"> | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    title?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    from?: DateTimeFilter<"Plan"> | Date | string
    to?: DateTimeFilter<"Plan"> | Date | string
    weekDay?: EnumWEEK_DAYSFilter<"Plan"> | $Enums.WEEK_DAYS
    trainerId?: StringFilter<"Plan"> | string
    traineeId?: StringFilter<"Plan"> | string
    Trainee?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    Activity?: ActivityListRelationFilter
    Train?: TrainListRelationFilter
    Report?: ReportListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    from?: SortOrder
    to?: SortOrder
    weekDay?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    Trainee?: ProfileOrderByWithRelationInput
    Activity?: ActivityOrderByRelationAggregateInput
    Train?: TrainOrderByRelationAggregateInput
    Report?: ReportOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    title?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    from?: DateTimeFilter<"Plan"> | Date | string
    to?: DateTimeFilter<"Plan"> | Date | string
    weekDay?: EnumWEEK_DAYSFilter<"Plan"> | $Enums.WEEK_DAYS
    trainerId?: StringFilter<"Plan"> | string
    traineeId?: StringFilter<"Plan"> | string
    Trainee?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    Activity?: ActivityListRelationFilter
    Train?: TrainListRelationFilter
    Report?: ReportListRelationFilter
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    from?: SortOrder
    to?: SortOrder
    weekDay?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    title?: StringWithAggregatesFilter<"Plan"> | string
    description?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    from?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    to?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    weekDay?: EnumWEEK_DAYSWithAggregatesFilter<"Plan"> | $Enums.WEEK_DAYS
    trainerId?: StringWithAggregatesFilter<"Plan"> | string
    traineeId?: StringWithAggregatesFilter<"Plan"> | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    name?: StringFilter<"Activity"> | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFilter<"Activity"> | $Enums.ACTIVITY_TYPE
    description?: StringNullableFilter<"Activity"> | string | null
    weight?: FloatNullableFilter<"Activity"> | number | null
    reps?: IntNullableFilter<"Activity"> | number | null
    sets?: IntNullableFilter<"Activity"> | number | null
    duration?: IntNullableFilter<"Activity"> | number | null
    planId?: StringFilter<"Activity"> | string
    reportExerciseId?: StringNullableFilter<"Activity"> | string | null
    Plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    Exercise?: ExerciseListRelationFilter
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ACTIVITY_TYPE?: SortOrder
    description?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    planId?: SortOrder
    reportExerciseId?: SortOrderInput | SortOrder
    Plan?: PlanOrderByWithRelationInput
    Exercise?: ExerciseOrderByRelationAggregateInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reportExerciseId?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    name?: StringFilter<"Activity"> | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFilter<"Activity"> | $Enums.ACTIVITY_TYPE
    description?: StringNullableFilter<"Activity"> | string | null
    weight?: FloatNullableFilter<"Activity"> | number | null
    reps?: IntNullableFilter<"Activity"> | number | null
    sets?: IntNullableFilter<"Activity"> | number | null
    duration?: IntNullableFilter<"Activity"> | number | null
    planId?: StringFilter<"Activity"> | string
    Plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    Exercise?: ExerciseListRelationFilter
  }, "id" | "reportExerciseId">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    ACTIVITY_TYPE?: SortOrder
    description?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    planId?: SortOrder
    reportExerciseId?: SortOrderInput | SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    name?: StringWithAggregatesFilter<"Activity"> | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEWithAggregatesFilter<"Activity"> | $Enums.ACTIVITY_TYPE
    description?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    weight?: FloatNullableWithAggregatesFilter<"Activity"> | number | null
    reps?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    sets?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    duration?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    planId?: StringWithAggregatesFilter<"Activity"> | string
    reportExerciseId?: StringNullableWithAggregatesFilter<"Activity"> | string | null
  }

  export type TrainWhereInput = {
    AND?: TrainWhereInput | TrainWhereInput[]
    OR?: TrainWhereInput[]
    NOT?: TrainWhereInput | TrainWhereInput[]
    id?: StringFilter<"Train"> | string
    from?: DateTimeFilter<"Train"> | Date | string
    to?: DateTimeFilter<"Train"> | Date | string
    planId?: StringFilter<"Train"> | string
    Plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    Exercise?: ExerciseListRelationFilter
  }

  export type TrainOrderByWithRelationInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    planId?: SortOrder
    Plan?: PlanOrderByWithRelationInput
    Exercise?: ExerciseOrderByRelationAggregateInput
  }

  export type TrainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainWhereInput | TrainWhereInput[]
    OR?: TrainWhereInput[]
    NOT?: TrainWhereInput | TrainWhereInput[]
    from?: DateTimeFilter<"Train"> | Date | string
    to?: DateTimeFilter<"Train"> | Date | string
    planId?: StringFilter<"Train"> | string
    Plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    Exercise?: ExerciseListRelationFilter
  }, "id">

  export type TrainOrderByWithAggregationInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    planId?: SortOrder
    _count?: TrainCountOrderByAggregateInput
    _max?: TrainMaxOrderByAggregateInput
    _min?: TrainMinOrderByAggregateInput
  }

  export type TrainScalarWhereWithAggregatesInput = {
    AND?: TrainScalarWhereWithAggregatesInput | TrainScalarWhereWithAggregatesInput[]
    OR?: TrainScalarWhereWithAggregatesInput[]
    NOT?: TrainScalarWhereWithAggregatesInput | TrainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Train"> | string
    from?: DateTimeWithAggregatesFilter<"Train"> | Date | string
    to?: DateTimeWithAggregatesFilter<"Train"> | Date | string
    planId?: StringWithAggregatesFilter<"Train"> | string
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    weight?: FloatNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    sets?: IntNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    description?: StringNullableFilter<"Exercise"> | string | null
    activityId?: StringFilter<"Exercise"> | string
    trainId?: StringFilter<"Exercise"> | string
    Activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
    Train?: XOR<TrainScalarRelationFilter, TrainWhereInput>
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    activityId?: SortOrder
    trainId?: SortOrder
    Activity?: ActivityOrderByWithRelationInput
    Train?: TrainOrderByWithRelationInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    weight?: FloatNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    sets?: IntNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    description?: StringNullableFilter<"Exercise"> | string | null
    activityId?: StringFilter<"Exercise"> | string
    trainId?: StringFilter<"Exercise"> | string
    Activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
    Train?: XOR<TrainScalarRelationFilter, TrainWhereInput>
  }, "id">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    activityId?: SortOrder
    trainId?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _avg?: ExerciseAvgOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
    _sum?: ExerciseSumOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    weight?: FloatNullableWithAggregatesFilter<"Exercise"> | number | null
    reps?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    sets?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    duration?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    description?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    activityId?: StringWithAggregatesFilter<"Exercise"> | string
    trainId?: StringWithAggregatesFilter<"Exercise"> | string
  }

  export type ProfileCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainee?: ProfileCreateNestedManyWithoutTrainerInput
    Trainer?: ProfileCreateNestedOneWithoutTraineeInput
    Plans?: PlanCreateNestedManyWithoutTraineeInput
    Report?: ReportCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    trainerId?: string | null
    Trainee?: ProfileUncheckedCreateNestedManyWithoutTrainerInput
    Plans?: PlanUncheckedCreateNestedManyWithoutTraineeInput
    Report?: ReportUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainee?: ProfileUpdateManyWithoutTrainerNestedInput
    Trainer?: ProfileUpdateOneWithoutTraineeNestedInput
    Plans?: PlanUpdateManyWithoutTraineeNestedInput
    Report?: ReportUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    Trainee?: ProfileUncheckedUpdateManyWithoutTrainerNestedInput
    Plans?: PlanUncheckedUpdateManyWithoutTraineeNestedInput
    Report?: ReportUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    trainerId?: string | null
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportCreateInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    BodyPart?: BodyPartCreateNestedManyWithoutReportInput
    Profile: ProfileCreateNestedOneWithoutReportInput
    Plan?: PlanCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    profileId: string
    planId?: string | null
    BodyPart?: BodyPartUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    BodyPart?: BodyPartUpdateManyWithoutReportNestedInput
    Profile?: ProfileUpdateOneRequiredWithoutReportNestedInput
    Plan?: PlanUpdateOneWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    BodyPart?: BodyPartUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    profileId: string
    planId?: string | null
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BodyPartCreateInput = {
    id?: string
    name: string
    bodyFat?: number | null
    Report: ReportCreateNestedOneWithoutBodyPartInput
  }

  export type BodyPartUncheckedCreateInput = {
    id?: string
    name: string
    bodyFat?: number | null
    reportId: string
  }

  export type BodyPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    Report?: ReportUpdateOneRequiredWithoutBodyPartNestedInput
  }

  export type BodyPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    reportId?: StringFieldUpdateOperationsInput | string
  }

  export type BodyPartCreateManyInput = {
    id?: string
    name: string
    bodyFat?: number | null
    reportId: string
  }

  export type BodyPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BodyPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    reportId?: StringFieldUpdateOperationsInput | string
  }

  export type PlanCreateInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Trainee: ProfileCreateNestedOneWithoutPlansInput
    Activity?: ActivityCreateNestedManyWithoutPlanInput
    Train?: TrainCreateNestedManyWithoutPlanInput
    Report?: ReportCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
    Activity?: ActivityUncheckedCreateNestedManyWithoutPlanInput
    Train?: TrainUncheckedCreateNestedManyWithoutPlanInput
    Report?: ReportUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Trainee?: ProfileUpdateOneRequiredWithoutPlansNestedInput
    Activity?: ActivityUpdateManyWithoutPlanNestedInput
    Train?: TrainUpdateManyWithoutPlanNestedInput
    Report?: ReportUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    Activity?: ActivityUncheckedUpdateManyWithoutPlanNestedInput
    Train?: TrainUncheckedUpdateManyWithoutPlanNestedInput
    Report?: ReportUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityCreateInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    reportExerciseId?: string | null
    Plan: PlanCreateNestedOneWithoutActivityInput
    Exercise?: ExerciseCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    planId: string
    reportExerciseId?: string | null
    Exercise?: ExerciseUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
    Plan?: PlanUpdateOneRequiredWithoutActivityNestedInput
    Exercise?: ExerciseUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    planId?: StringFieldUpdateOperationsInput | string
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
    Exercise?: ExerciseUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityCreateManyInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    planId: string
    reportExerciseId?: string | null
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    planId?: StringFieldUpdateOperationsInput | string
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrainCreateInput = {
    id?: string
    from: Date | string
    to: Date | string
    Plan: PlanCreateNestedOneWithoutTrainInput
    Exercise?: ExerciseCreateNestedManyWithoutTrainInput
  }

  export type TrainUncheckedCreateInput = {
    id?: string
    from: Date | string
    to: Date | string
    planId: string
    Exercise?: ExerciseUncheckedCreateNestedManyWithoutTrainInput
  }

  export type TrainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    Plan?: PlanUpdateOneRequiredWithoutTrainNestedInput
    Exercise?: ExerciseUpdateManyWithoutTrainNestedInput
  }

  export type TrainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    planId?: StringFieldUpdateOperationsInput | string
    Exercise?: ExerciseUncheckedUpdateManyWithoutTrainNestedInput
  }

  export type TrainCreateManyInput = {
    id?: string
    from: Date | string
    to: Date | string
    planId: string
  }

  export type TrainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    planId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    Activity: ActivityCreateNestedOneWithoutExerciseInput
    Train: TrainCreateNestedOneWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    activityId: string
    trainId: string
  }

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    Activity?: ActivityUpdateOneRequiredWithoutExerciseNestedInput
    Train?: TrainUpdateOneRequiredWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: StringFieldUpdateOperationsInput | string
    trainId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateManyInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    activityId: string
    trainId: string
  }

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: StringFieldUpdateOperationsInput | string
    trainId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProfileListRelationFilter = {
    every?: ProfileWhereInput
    some?: ProfileWhereInput
    none?: ProfileWhereInput
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type PlanListRelationFilter = {
    every?: PlanWhereInput
    some?: PlanWhereInput
    none?: PlanWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    trainerId?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    role?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    trainerId?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    trainerId?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BodyPartListRelationFilter = {
    every?: BodyPartWhereInput
    some?: BodyPartWhereInput
    none?: BodyPartWhereInput
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type PlanNullableScalarRelationFilter = {
    is?: PlanWhereInput | null
    isNot?: PlanWhereInput | null
  }

  export type BodyPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    content?: SortOrder
    imc?: SortOrder
    bodyFat?: SortOrder
    weight?: SortOrder
    profileId?: SortOrder
    planId?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    imc?: SortOrder
    bodyFat?: SortOrder
    weight?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    content?: SortOrder
    imc?: SortOrder
    bodyFat?: SortOrder
    weight?: SortOrder
    profileId?: SortOrder
    planId?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    content?: SortOrder
    imc?: SortOrder
    bodyFat?: SortOrder
    weight?: SortOrder
    profileId?: SortOrder
    planId?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    imc?: SortOrder
    bodyFat?: SortOrder
    weight?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ReportScalarRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type BodyPartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bodyFat?: SortOrder
    reportId?: SortOrder
  }

  export type BodyPartAvgOrderByAggregateInput = {
    bodyFat?: SortOrder
  }

  export type BodyPartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bodyFat?: SortOrder
    reportId?: SortOrder
  }

  export type BodyPartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bodyFat?: SortOrder
    reportId?: SortOrder
  }

  export type BodyPartSumOrderByAggregateInput = {
    bodyFat?: SortOrder
  }

  export type EnumWEEK_DAYSFilter<$PrismaModel = never> = {
    equals?: $Enums.WEEK_DAYS | EnumWEEK_DAYSFieldRefInput<$PrismaModel>
    in?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    notIn?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    not?: NestedEnumWEEK_DAYSFilter<$PrismaModel> | $Enums.WEEK_DAYS
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type TrainListRelationFilter = {
    every?: TrainWhereInput
    some?: TrainWhereInput
    none?: TrainWhereInput
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    from?: SortOrder
    to?: SortOrder
    weekDay?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    from?: SortOrder
    to?: SortOrder
    weekDay?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    from?: SortOrder
    to?: SortOrder
    weekDay?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
  }

  export type EnumWEEK_DAYSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WEEK_DAYS | EnumWEEK_DAYSFieldRefInput<$PrismaModel>
    in?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    notIn?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    not?: NestedEnumWEEK_DAYSWithAggregatesFilter<$PrismaModel> | $Enums.WEEK_DAYS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWEEK_DAYSFilter<$PrismaModel>
    _max?: NestedEnumWEEK_DAYSFilter<$PrismaModel>
  }

  export type EnumACTIVITY_TYPEFilter<$PrismaModel = never> = {
    equals?: $Enums.ACTIVITY_TYPE | EnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel> | $Enums.ACTIVITY_TYPE
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ACTIVITY_TYPE?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    planId?: SortOrder
    reportExerciseId?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ACTIVITY_TYPE?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    planId?: SortOrder
    reportExerciseId?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ACTIVITY_TYPE?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    planId?: SortOrder
    reportExerciseId?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
  }

  export type EnumACTIVITY_TYPEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ACTIVITY_TYPE | EnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumACTIVITY_TYPEWithAggregatesFilter<$PrismaModel> | $Enums.ACTIVITY_TYPE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel>
    _max?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TrainCountOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    planId?: SortOrder
  }

  export type TrainMaxOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    planId?: SortOrder
  }

  export type TrainMinOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    planId?: SortOrder
  }

  export type ActivityScalarRelationFilter = {
    is?: ActivityWhereInput
    isNot?: ActivityWhereInput
  }

  export type TrainScalarRelationFilter = {
    is?: TrainWhereInput
    isNot?: TrainWhereInput
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    activityId?: SortOrder
    trainId?: SortOrder
  }

  export type ExerciseAvgOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    activityId?: SortOrder
    trainId?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    activityId?: SortOrder
    trainId?: SortOrder
  }

  export type ExerciseSumOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    duration?: SortOrder
  }

  export type ProfileCreateNestedManyWithoutTrainerInput = {
    create?: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput> | ProfileCreateWithoutTrainerInput[] | ProfileUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutTrainerInput | ProfileCreateOrConnectWithoutTrainerInput[]
    createMany?: ProfileCreateManyTrainerInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutTraineeInput = {
    create?: XOR<ProfileCreateWithoutTraineeInput, ProfileUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTraineeInput
    connect?: ProfileWhereUniqueInput
  }

  export type PlanCreateNestedManyWithoutTraineeInput = {
    create?: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput> | PlanCreateWithoutTraineeInput[] | PlanUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutTraineeInput | PlanCreateOrConnectWithoutTraineeInput[]
    createMany?: PlanCreateManyTraineeInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutProfileInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput> | ProfileCreateWithoutTrainerInput[] | ProfileUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutTrainerInput | ProfileCreateOrConnectWithoutTrainerInput[]
    createMany?: ProfileCreateManyTrainerInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type PlanUncheckedCreateNestedManyWithoutTraineeInput = {
    create?: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput> | PlanCreateWithoutTraineeInput[] | PlanUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutTraineeInput | PlanCreateOrConnectWithoutTraineeInput[]
    createMany?: PlanCreateManyTraineeInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput> | ProfileCreateWithoutTrainerInput[] | ProfileUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutTrainerInput | ProfileCreateOrConnectWithoutTrainerInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutTrainerInput | ProfileUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: ProfileCreateManyTrainerInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutTrainerInput | ProfileUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutTrainerInput | ProfileUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type ProfileUpdateOneWithoutTraineeNestedInput = {
    create?: XOR<ProfileCreateWithoutTraineeInput, ProfileUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTraineeInput
    upsert?: ProfileUpsertWithoutTraineeInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutTraineeInput, ProfileUpdateWithoutTraineeInput>, ProfileUncheckedUpdateWithoutTraineeInput>
  }

  export type PlanUpdateManyWithoutTraineeNestedInput = {
    create?: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput> | PlanCreateWithoutTraineeInput[] | PlanUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutTraineeInput | PlanCreateOrConnectWithoutTraineeInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutTraineeInput | PlanUpsertWithWhereUniqueWithoutTraineeInput[]
    createMany?: PlanCreateManyTraineeInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutTraineeInput | PlanUpdateWithWhereUniqueWithoutTraineeInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutTraineeInput | PlanUpdateManyWithWhereWithoutTraineeInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutProfileInput | ReportUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutProfileInput | ReportUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutProfileInput | ReportUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput> | ProfileCreateWithoutTrainerInput[] | ProfileUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutTrainerInput | ProfileCreateOrConnectWithoutTrainerInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutTrainerInput | ProfileUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: ProfileCreateManyTrainerInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutTrainerInput | ProfileUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutTrainerInput | ProfileUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type PlanUncheckedUpdateManyWithoutTraineeNestedInput = {
    create?: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput> | PlanCreateWithoutTraineeInput[] | PlanUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutTraineeInput | PlanCreateOrConnectWithoutTraineeInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutTraineeInput | PlanUpsertWithWhereUniqueWithoutTraineeInput[]
    createMany?: PlanCreateManyTraineeInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutTraineeInput | PlanUpdateWithWhereUniqueWithoutTraineeInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutTraineeInput | PlanUpdateManyWithWhereWithoutTraineeInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutProfileInput | ReportUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutProfileInput | ReportUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutProfileInput | ReportUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type BodyPartCreateNestedManyWithoutReportInput = {
    create?: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput> | BodyPartCreateWithoutReportInput[] | BodyPartUncheckedCreateWithoutReportInput[]
    connectOrCreate?: BodyPartCreateOrConnectWithoutReportInput | BodyPartCreateOrConnectWithoutReportInput[]
    createMany?: BodyPartCreateManyReportInputEnvelope
    connect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutReportInput = {
    create?: XOR<ProfileCreateWithoutReportInput, ProfileUncheckedCreateWithoutReportInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReportInput
    connect?: ProfileWhereUniqueInput
  }

  export type PlanCreateNestedOneWithoutReportInput = {
    create?: XOR<PlanCreateWithoutReportInput, PlanUncheckedCreateWithoutReportInput>
    connectOrCreate?: PlanCreateOrConnectWithoutReportInput
    connect?: PlanWhereUniqueInput
  }

  export type BodyPartUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput> | BodyPartCreateWithoutReportInput[] | BodyPartUncheckedCreateWithoutReportInput[]
    connectOrCreate?: BodyPartCreateOrConnectWithoutReportInput | BodyPartCreateOrConnectWithoutReportInput[]
    createMany?: BodyPartCreateManyReportInputEnvelope
    connect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BodyPartUpdateManyWithoutReportNestedInput = {
    create?: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput> | BodyPartCreateWithoutReportInput[] | BodyPartUncheckedCreateWithoutReportInput[]
    connectOrCreate?: BodyPartCreateOrConnectWithoutReportInput | BodyPartCreateOrConnectWithoutReportInput[]
    upsert?: BodyPartUpsertWithWhereUniqueWithoutReportInput | BodyPartUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: BodyPartCreateManyReportInputEnvelope
    set?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    disconnect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    delete?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    connect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    update?: BodyPartUpdateWithWhereUniqueWithoutReportInput | BodyPartUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: BodyPartUpdateManyWithWhereWithoutReportInput | BodyPartUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: BodyPartScalarWhereInput | BodyPartScalarWhereInput[]
  }

  export type ProfileUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<ProfileCreateWithoutReportInput, ProfileUncheckedCreateWithoutReportInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReportInput
    upsert?: ProfileUpsertWithoutReportInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutReportInput, ProfileUpdateWithoutReportInput>, ProfileUncheckedUpdateWithoutReportInput>
  }

  export type PlanUpdateOneWithoutReportNestedInput = {
    create?: XOR<PlanCreateWithoutReportInput, PlanUncheckedCreateWithoutReportInput>
    connectOrCreate?: PlanCreateOrConnectWithoutReportInput
    upsert?: PlanUpsertWithoutReportInput
    disconnect?: PlanWhereInput | boolean
    delete?: PlanWhereInput | boolean
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutReportInput, PlanUpdateWithoutReportInput>, PlanUncheckedUpdateWithoutReportInput>
  }

  export type BodyPartUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput> | BodyPartCreateWithoutReportInput[] | BodyPartUncheckedCreateWithoutReportInput[]
    connectOrCreate?: BodyPartCreateOrConnectWithoutReportInput | BodyPartCreateOrConnectWithoutReportInput[]
    upsert?: BodyPartUpsertWithWhereUniqueWithoutReportInput | BodyPartUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: BodyPartCreateManyReportInputEnvelope
    set?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    disconnect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    delete?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    connect?: BodyPartWhereUniqueInput | BodyPartWhereUniqueInput[]
    update?: BodyPartUpdateWithWhereUniqueWithoutReportInput | BodyPartUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: BodyPartUpdateManyWithWhereWithoutReportInput | BodyPartUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: BodyPartScalarWhereInput | BodyPartScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutBodyPartInput = {
    create?: XOR<ReportCreateWithoutBodyPartInput, ReportUncheckedCreateWithoutBodyPartInput>
    connectOrCreate?: ReportCreateOrConnectWithoutBodyPartInput
    connect?: ReportWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutBodyPartNestedInput = {
    create?: XOR<ReportCreateWithoutBodyPartInput, ReportUncheckedCreateWithoutBodyPartInput>
    connectOrCreate?: ReportCreateOrConnectWithoutBodyPartInput
    upsert?: ReportUpsertWithoutBodyPartInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutBodyPartInput, ReportUpdateWithoutBodyPartInput>, ReportUncheckedUpdateWithoutBodyPartInput>
  }

  export type ProfileCreateNestedOneWithoutPlansInput = {
    create?: XOR<ProfileCreateWithoutPlansInput, ProfileUncheckedCreateWithoutPlansInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPlansInput
    connect?: ProfileWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutPlanInput = {
    create?: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput> | ActivityCreateWithoutPlanInput[] | ActivityUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutPlanInput | ActivityCreateOrConnectWithoutPlanInput[]
    createMany?: ActivityCreateManyPlanInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TrainCreateNestedManyWithoutPlanInput = {
    create?: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput> | TrainCreateWithoutPlanInput[] | TrainUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TrainCreateOrConnectWithoutPlanInput | TrainCreateOrConnectWithoutPlanInput[]
    createMany?: TrainCreateManyPlanInputEnvelope
    connect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutPlanInput = {
    create?: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput> | ReportCreateWithoutPlanInput[] | ReportUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutPlanInput | ReportCreateOrConnectWithoutPlanInput[]
    createMany?: ReportCreateManyPlanInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput> | ActivityCreateWithoutPlanInput[] | ActivityUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutPlanInput | ActivityCreateOrConnectWithoutPlanInput[]
    createMany?: ActivityCreateManyPlanInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TrainUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput> | TrainCreateWithoutPlanInput[] | TrainUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TrainCreateOrConnectWithoutPlanInput | TrainCreateOrConnectWithoutPlanInput[]
    createMany?: TrainCreateManyPlanInputEnvelope
    connect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput> | ReportCreateWithoutPlanInput[] | ReportUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutPlanInput | ReportCreateOrConnectWithoutPlanInput[]
    createMany?: ReportCreateManyPlanInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type EnumWEEK_DAYSFieldUpdateOperationsInput = {
    set?: $Enums.WEEK_DAYS
  }

  export type ProfileUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<ProfileCreateWithoutPlansInput, ProfileUncheckedCreateWithoutPlansInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPlansInput
    upsert?: ProfileUpsertWithoutPlansInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutPlansInput, ProfileUpdateWithoutPlansInput>, ProfileUncheckedUpdateWithoutPlansInput>
  }

  export type ActivityUpdateManyWithoutPlanNestedInput = {
    create?: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput> | ActivityCreateWithoutPlanInput[] | ActivityUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutPlanInput | ActivityCreateOrConnectWithoutPlanInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutPlanInput | ActivityUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: ActivityCreateManyPlanInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutPlanInput | ActivityUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutPlanInput | ActivityUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TrainUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput> | TrainCreateWithoutPlanInput[] | TrainUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TrainCreateOrConnectWithoutPlanInput | TrainCreateOrConnectWithoutPlanInput[]
    upsert?: TrainUpsertWithWhereUniqueWithoutPlanInput | TrainUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TrainCreateManyPlanInputEnvelope
    set?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    disconnect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    delete?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    connect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    update?: TrainUpdateWithWhereUniqueWithoutPlanInput | TrainUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TrainUpdateManyWithWhereWithoutPlanInput | TrainUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TrainScalarWhereInput | TrainScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutPlanNestedInput = {
    create?: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput> | ReportCreateWithoutPlanInput[] | ReportUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutPlanInput | ReportCreateOrConnectWithoutPlanInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutPlanInput | ReportUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: ReportCreateManyPlanInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutPlanInput | ReportUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutPlanInput | ReportUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput> | ActivityCreateWithoutPlanInput[] | ActivityUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutPlanInput | ActivityCreateOrConnectWithoutPlanInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutPlanInput | ActivityUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: ActivityCreateManyPlanInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutPlanInput | ActivityUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutPlanInput | ActivityUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TrainUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput> | TrainCreateWithoutPlanInput[] | TrainUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TrainCreateOrConnectWithoutPlanInput | TrainCreateOrConnectWithoutPlanInput[]
    upsert?: TrainUpsertWithWhereUniqueWithoutPlanInput | TrainUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TrainCreateManyPlanInputEnvelope
    set?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    disconnect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    delete?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    connect?: TrainWhereUniqueInput | TrainWhereUniqueInput[]
    update?: TrainUpdateWithWhereUniqueWithoutPlanInput | TrainUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TrainUpdateManyWithWhereWithoutPlanInput | TrainUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TrainScalarWhereInput | TrainScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput> | ReportCreateWithoutPlanInput[] | ReportUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutPlanInput | ReportCreateOrConnectWithoutPlanInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutPlanInput | ReportUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: ReportCreateManyPlanInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutPlanInput | ReportUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutPlanInput | ReportUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutActivityInput = {
    create?: XOR<PlanCreateWithoutActivityInput, PlanUncheckedCreateWithoutActivityInput>
    connectOrCreate?: PlanCreateOrConnectWithoutActivityInput
    connect?: PlanWhereUniqueInput
  }

  export type ExerciseCreateNestedManyWithoutActivityInput = {
    create?: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput> | ExerciseCreateWithoutActivityInput[] | ExerciseUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutActivityInput | ExerciseCreateOrConnectWithoutActivityInput[]
    createMany?: ExerciseCreateManyActivityInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput> | ExerciseCreateWithoutActivityInput[] | ExerciseUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutActivityInput | ExerciseCreateOrConnectWithoutActivityInput[]
    createMany?: ExerciseCreateManyActivityInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type EnumACTIVITY_TYPEFieldUpdateOperationsInput = {
    set?: $Enums.ACTIVITY_TYPE
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlanUpdateOneRequiredWithoutActivityNestedInput = {
    create?: XOR<PlanCreateWithoutActivityInput, PlanUncheckedCreateWithoutActivityInput>
    connectOrCreate?: PlanCreateOrConnectWithoutActivityInput
    upsert?: PlanUpsertWithoutActivityInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutActivityInput, PlanUpdateWithoutActivityInput>, PlanUncheckedUpdateWithoutActivityInput>
  }

  export type ExerciseUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput> | ExerciseCreateWithoutActivityInput[] | ExerciseUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutActivityInput | ExerciseCreateOrConnectWithoutActivityInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutActivityInput | ExerciseUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ExerciseCreateManyActivityInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutActivityInput | ExerciseUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutActivityInput | ExerciseUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput> | ExerciseCreateWithoutActivityInput[] | ExerciseUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutActivityInput | ExerciseCreateOrConnectWithoutActivityInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutActivityInput | ExerciseUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ExerciseCreateManyActivityInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutActivityInput | ExerciseUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutActivityInput | ExerciseUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutTrainInput = {
    create?: XOR<PlanCreateWithoutTrainInput, PlanUncheckedCreateWithoutTrainInput>
    connectOrCreate?: PlanCreateOrConnectWithoutTrainInput
    connect?: PlanWhereUniqueInput
  }

  export type ExerciseCreateNestedManyWithoutTrainInput = {
    create?: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput> | ExerciseCreateWithoutTrainInput[] | ExerciseUncheckedCreateWithoutTrainInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTrainInput | ExerciseCreateOrConnectWithoutTrainInput[]
    createMany?: ExerciseCreateManyTrainInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutTrainInput = {
    create?: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput> | ExerciseCreateWithoutTrainInput[] | ExerciseUncheckedCreateWithoutTrainInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTrainInput | ExerciseCreateOrConnectWithoutTrainInput[]
    createMany?: ExerciseCreateManyTrainInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type PlanUpdateOneRequiredWithoutTrainNestedInput = {
    create?: XOR<PlanCreateWithoutTrainInput, PlanUncheckedCreateWithoutTrainInput>
    connectOrCreate?: PlanCreateOrConnectWithoutTrainInput
    upsert?: PlanUpsertWithoutTrainInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutTrainInput, PlanUpdateWithoutTrainInput>, PlanUncheckedUpdateWithoutTrainInput>
  }

  export type ExerciseUpdateManyWithoutTrainNestedInput = {
    create?: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput> | ExerciseCreateWithoutTrainInput[] | ExerciseUncheckedCreateWithoutTrainInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTrainInput | ExerciseCreateOrConnectWithoutTrainInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutTrainInput | ExerciseUpsertWithWhereUniqueWithoutTrainInput[]
    createMany?: ExerciseCreateManyTrainInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutTrainInput | ExerciseUpdateWithWhereUniqueWithoutTrainInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutTrainInput | ExerciseUpdateManyWithWhereWithoutTrainInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutTrainNestedInput = {
    create?: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput> | ExerciseCreateWithoutTrainInput[] | ExerciseUncheckedCreateWithoutTrainInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTrainInput | ExerciseCreateOrConnectWithoutTrainInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutTrainInput | ExerciseUpsertWithWhereUniqueWithoutTrainInput[]
    createMany?: ExerciseCreateManyTrainInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutTrainInput | ExerciseUpdateWithWhereUniqueWithoutTrainInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutTrainInput | ExerciseUpdateManyWithWhereWithoutTrainInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ActivityCreateNestedOneWithoutExerciseInput = {
    create?: XOR<ActivityCreateWithoutExerciseInput, ActivityUncheckedCreateWithoutExerciseInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutExerciseInput
    connect?: ActivityWhereUniqueInput
  }

  export type TrainCreateNestedOneWithoutExerciseInput = {
    create?: XOR<TrainCreateWithoutExerciseInput, TrainUncheckedCreateWithoutExerciseInput>
    connectOrCreate?: TrainCreateOrConnectWithoutExerciseInput
    connect?: TrainWhereUniqueInput
  }

  export type ActivityUpdateOneRequiredWithoutExerciseNestedInput = {
    create?: XOR<ActivityCreateWithoutExerciseInput, ActivityUncheckedCreateWithoutExerciseInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutExerciseInput
    upsert?: ActivityUpsertWithoutExerciseInput
    connect?: ActivityWhereUniqueInput
    update?: XOR<XOR<ActivityUpdateToOneWithWhereWithoutExerciseInput, ActivityUpdateWithoutExerciseInput>, ActivityUncheckedUpdateWithoutExerciseInput>
  }

  export type TrainUpdateOneRequiredWithoutExerciseNestedInput = {
    create?: XOR<TrainCreateWithoutExerciseInput, TrainUncheckedCreateWithoutExerciseInput>
    connectOrCreate?: TrainCreateOrConnectWithoutExerciseInput
    upsert?: TrainUpsertWithoutExerciseInput
    connect?: TrainWhereUniqueInput
    update?: XOR<XOR<TrainUpdateToOneWithWhereWithoutExerciseInput, TrainUpdateWithoutExerciseInput>, TrainUncheckedUpdateWithoutExerciseInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumWEEK_DAYSFilter<$PrismaModel = never> = {
    equals?: $Enums.WEEK_DAYS | EnumWEEK_DAYSFieldRefInput<$PrismaModel>
    in?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    notIn?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    not?: NestedEnumWEEK_DAYSFilter<$PrismaModel> | $Enums.WEEK_DAYS
  }

  export type NestedEnumWEEK_DAYSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WEEK_DAYS | EnumWEEK_DAYSFieldRefInput<$PrismaModel>
    in?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    notIn?: $Enums.WEEK_DAYS[] | ListEnumWEEK_DAYSFieldRefInput<$PrismaModel>
    not?: NestedEnumWEEK_DAYSWithAggregatesFilter<$PrismaModel> | $Enums.WEEK_DAYS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWEEK_DAYSFilter<$PrismaModel>
    _max?: NestedEnumWEEK_DAYSFilter<$PrismaModel>
  }

  export type NestedEnumACTIVITY_TYPEFilter<$PrismaModel = never> = {
    equals?: $Enums.ACTIVITY_TYPE | EnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel> | $Enums.ACTIVITY_TYPE
  }

  export type NestedEnumACTIVITY_TYPEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ACTIVITY_TYPE | EnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    in?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ACTIVITY_TYPE[] | ListEnumACTIVITY_TYPEFieldRefInput<$PrismaModel>
    not?: NestedEnumACTIVITY_TYPEWithAggregatesFilter<$PrismaModel> | $Enums.ACTIVITY_TYPE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel>
    _max?: NestedEnumACTIVITY_TYPEFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutTrainerInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainee?: ProfileCreateNestedManyWithoutTrainerInput
    Plans?: PlanCreateNestedManyWithoutTraineeInput
    Report?: ReportCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutTrainerInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainee?: ProfileUncheckedCreateNestedManyWithoutTrainerInput
    Plans?: PlanUncheckedCreateNestedManyWithoutTraineeInput
    Report?: ReportUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutTrainerInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput>
  }

  export type ProfileCreateManyTrainerInputEnvelope = {
    data: ProfileCreateManyTrainerInput | ProfileCreateManyTrainerInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutTraineeInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainer?: ProfileCreateNestedOneWithoutTraineeInput
    Plans?: PlanCreateNestedManyWithoutTraineeInput
    Report?: ReportCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutTraineeInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    trainerId?: string | null
    Plans?: PlanUncheckedCreateNestedManyWithoutTraineeInput
    Report?: ReportUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutTraineeInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutTraineeInput, ProfileUncheckedCreateWithoutTraineeInput>
  }

  export type PlanCreateWithoutTraineeInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Activity?: ActivityCreateNestedManyWithoutPlanInput
    Train?: TrainCreateNestedManyWithoutPlanInput
    Report?: ReportCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutTraineeInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Activity?: ActivityUncheckedCreateNestedManyWithoutPlanInput
    Train?: TrainUncheckedCreateNestedManyWithoutPlanInput
    Report?: ReportUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutTraineeInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput>
  }

  export type PlanCreateManyTraineeInputEnvelope = {
    data: PlanCreateManyTraineeInput | PlanCreateManyTraineeInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutProfileInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    BodyPart?: BodyPartCreateNestedManyWithoutReportInput
    Plan?: PlanCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutProfileInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    planId?: string | null
    BodyPart?: BodyPartUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutProfileInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput>
  }

  export type ReportCreateManyProfileInputEnvelope = {
    data: ReportCreateManyProfileInput | ReportCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithWhereUniqueWithoutTrainerInput = {
    where: ProfileWhereUniqueInput
    update: XOR<ProfileUpdateWithoutTrainerInput, ProfileUncheckedUpdateWithoutTrainerInput>
    create: XOR<ProfileCreateWithoutTrainerInput, ProfileUncheckedCreateWithoutTrainerInput>
  }

  export type ProfileUpdateWithWhereUniqueWithoutTrainerInput = {
    where: ProfileWhereUniqueInput
    data: XOR<ProfileUpdateWithoutTrainerInput, ProfileUncheckedUpdateWithoutTrainerInput>
  }

  export type ProfileUpdateManyWithWhereWithoutTrainerInput = {
    where: ProfileScalarWhereInput
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyWithoutTrainerInput>
  }

  export type ProfileScalarWhereInput = {
    AND?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    OR?: ProfileScalarWhereInput[]
    NOT?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    id?: StringFilter<"Profile"> | string
    name?: StringNullableFilter<"Profile"> | string | null
    email?: StringFilter<"Profile"> | string
    password?: StringFilter<"Profile"> | string
    role?: IntFilter<"Profile"> | number
    trainerId?: StringNullableFilter<"Profile"> | string | null
  }

  export type ProfileUpsertWithoutTraineeInput = {
    update: XOR<ProfileUpdateWithoutTraineeInput, ProfileUncheckedUpdateWithoutTraineeInput>
    create: XOR<ProfileCreateWithoutTraineeInput, ProfileUncheckedCreateWithoutTraineeInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutTraineeInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutTraineeInput, ProfileUncheckedUpdateWithoutTraineeInput>
  }

  export type ProfileUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainer?: ProfileUpdateOneWithoutTraineeNestedInput
    Plans?: PlanUpdateManyWithoutTraineeNestedInput
    Report?: ReportUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    Plans?: PlanUncheckedUpdateManyWithoutTraineeNestedInput
    Report?: ReportUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type PlanUpsertWithWhereUniqueWithoutTraineeInput = {
    where: PlanWhereUniqueInput
    update: XOR<PlanUpdateWithoutTraineeInput, PlanUncheckedUpdateWithoutTraineeInput>
    create: XOR<PlanCreateWithoutTraineeInput, PlanUncheckedCreateWithoutTraineeInput>
  }

  export type PlanUpdateWithWhereUniqueWithoutTraineeInput = {
    where: PlanWhereUniqueInput
    data: XOR<PlanUpdateWithoutTraineeInput, PlanUncheckedUpdateWithoutTraineeInput>
  }

  export type PlanUpdateManyWithWhereWithoutTraineeInput = {
    where: PlanScalarWhereInput
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyWithoutTraineeInput>
  }

  export type PlanScalarWhereInput = {
    AND?: PlanScalarWhereInput | PlanScalarWhereInput[]
    OR?: PlanScalarWhereInput[]
    NOT?: PlanScalarWhereInput | PlanScalarWhereInput[]
    id?: StringFilter<"Plan"> | string
    title?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    from?: DateTimeFilter<"Plan"> | Date | string
    to?: DateTimeFilter<"Plan"> | Date | string
    weekDay?: EnumWEEK_DAYSFilter<"Plan"> | $Enums.WEEK_DAYS
    trainerId?: StringFilter<"Plan"> | string
    traineeId?: StringFilter<"Plan"> | string
  }

  export type ReportUpsertWithWhereUniqueWithoutProfileInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutProfileInput, ReportUncheckedUpdateWithoutProfileInput>
    create: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutProfileInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutProfileInput, ReportUncheckedUpdateWithoutProfileInput>
  }

  export type ReportUpdateManyWithWhereWithoutProfileInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutProfileInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    content?: StringNullableFilter<"Report"> | string | null
    imc?: FloatNullableFilter<"Report"> | number | null
    bodyFat?: FloatNullableFilter<"Report"> | number | null
    weight?: FloatNullableFilter<"Report"> | number | null
    profileId?: StringFilter<"Report"> | string
    planId?: StringNullableFilter<"Report"> | string | null
  }

  export type BodyPartCreateWithoutReportInput = {
    id?: string
    name: string
    bodyFat?: number | null
  }

  export type BodyPartUncheckedCreateWithoutReportInput = {
    id?: string
    name: string
    bodyFat?: number | null
  }

  export type BodyPartCreateOrConnectWithoutReportInput = {
    where: BodyPartWhereUniqueInput
    create: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput>
  }

  export type BodyPartCreateManyReportInputEnvelope = {
    data: BodyPartCreateManyReportInput | BodyPartCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutReportInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainee?: ProfileCreateNestedManyWithoutTrainerInput
    Trainer?: ProfileCreateNestedOneWithoutTraineeInput
    Plans?: PlanCreateNestedManyWithoutTraineeInput
  }

  export type ProfileUncheckedCreateWithoutReportInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    trainerId?: string | null
    Trainee?: ProfileUncheckedCreateNestedManyWithoutTrainerInput
    Plans?: PlanUncheckedCreateNestedManyWithoutTraineeInput
  }

  export type ProfileCreateOrConnectWithoutReportInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutReportInput, ProfileUncheckedCreateWithoutReportInput>
  }

  export type PlanCreateWithoutReportInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Trainee: ProfileCreateNestedOneWithoutPlansInput
    Activity?: ActivityCreateNestedManyWithoutPlanInput
    Train?: TrainCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutReportInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
    Activity?: ActivityUncheckedCreateNestedManyWithoutPlanInput
    Train?: TrainUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutReportInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutReportInput, PlanUncheckedCreateWithoutReportInput>
  }

  export type BodyPartUpsertWithWhereUniqueWithoutReportInput = {
    where: BodyPartWhereUniqueInput
    update: XOR<BodyPartUpdateWithoutReportInput, BodyPartUncheckedUpdateWithoutReportInput>
    create: XOR<BodyPartCreateWithoutReportInput, BodyPartUncheckedCreateWithoutReportInput>
  }

  export type BodyPartUpdateWithWhereUniqueWithoutReportInput = {
    where: BodyPartWhereUniqueInput
    data: XOR<BodyPartUpdateWithoutReportInput, BodyPartUncheckedUpdateWithoutReportInput>
  }

  export type BodyPartUpdateManyWithWhereWithoutReportInput = {
    where: BodyPartScalarWhereInput
    data: XOR<BodyPartUpdateManyMutationInput, BodyPartUncheckedUpdateManyWithoutReportInput>
  }

  export type BodyPartScalarWhereInput = {
    AND?: BodyPartScalarWhereInput | BodyPartScalarWhereInput[]
    OR?: BodyPartScalarWhereInput[]
    NOT?: BodyPartScalarWhereInput | BodyPartScalarWhereInput[]
    id?: StringFilter<"BodyPart"> | string
    name?: StringFilter<"BodyPart"> | string
    bodyFat?: FloatNullableFilter<"BodyPart"> | number | null
    reportId?: StringFilter<"BodyPart"> | string
  }

  export type ProfileUpsertWithoutReportInput = {
    update: XOR<ProfileUpdateWithoutReportInput, ProfileUncheckedUpdateWithoutReportInput>
    create: XOR<ProfileCreateWithoutReportInput, ProfileUncheckedCreateWithoutReportInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutReportInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutReportInput, ProfileUncheckedUpdateWithoutReportInput>
  }

  export type ProfileUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainee?: ProfileUpdateManyWithoutTrainerNestedInput
    Trainer?: ProfileUpdateOneWithoutTraineeNestedInput
    Plans?: PlanUpdateManyWithoutTraineeNestedInput
  }

  export type ProfileUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    Trainee?: ProfileUncheckedUpdateManyWithoutTrainerNestedInput
    Plans?: PlanUncheckedUpdateManyWithoutTraineeNestedInput
  }

  export type PlanUpsertWithoutReportInput = {
    update: XOR<PlanUpdateWithoutReportInput, PlanUncheckedUpdateWithoutReportInput>
    create: XOR<PlanCreateWithoutReportInput, PlanUncheckedCreateWithoutReportInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutReportInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutReportInput, PlanUncheckedUpdateWithoutReportInput>
  }

  export type PlanUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Trainee?: ProfileUpdateOneRequiredWithoutPlansNestedInput
    Activity?: ActivityUpdateManyWithoutPlanNestedInput
    Train?: TrainUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    Activity?: ActivityUncheckedUpdateManyWithoutPlanNestedInput
    Train?: TrainUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ReportCreateWithoutBodyPartInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    Profile: ProfileCreateNestedOneWithoutReportInput
    Plan?: PlanCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutBodyPartInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    profileId: string
    planId?: string | null
  }

  export type ReportCreateOrConnectWithoutBodyPartInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutBodyPartInput, ReportUncheckedCreateWithoutBodyPartInput>
  }

  export type ReportUpsertWithoutBodyPartInput = {
    update: XOR<ReportUpdateWithoutBodyPartInput, ReportUncheckedUpdateWithoutBodyPartInput>
    create: XOR<ReportCreateWithoutBodyPartInput, ReportUncheckedCreateWithoutBodyPartInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutBodyPartInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutBodyPartInput, ReportUncheckedUpdateWithoutBodyPartInput>
  }

  export type ReportUpdateWithoutBodyPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    Profile?: ProfileUpdateOneRequiredWithoutReportNestedInput
    Plan?: PlanUpdateOneWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutBodyPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCreateWithoutPlansInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    Trainee?: ProfileCreateNestedManyWithoutTrainerInput
    Trainer?: ProfileCreateNestedOneWithoutTraineeInput
    Report?: ReportCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutPlansInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
    trainerId?: string | null
    Trainee?: ProfileUncheckedCreateNestedManyWithoutTrainerInput
    Report?: ReportUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutPlansInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutPlansInput, ProfileUncheckedCreateWithoutPlansInput>
  }

  export type ActivityCreateWithoutPlanInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    reportExerciseId?: string | null
    Exercise?: ExerciseCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutPlanInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    reportExerciseId?: string | null
    Exercise?: ExerciseUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityCreateOrConnectWithoutPlanInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput>
  }

  export type ActivityCreateManyPlanInputEnvelope = {
    data: ActivityCreateManyPlanInput | ActivityCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type TrainCreateWithoutPlanInput = {
    id?: string
    from: Date | string
    to: Date | string
    Exercise?: ExerciseCreateNestedManyWithoutTrainInput
  }

  export type TrainUncheckedCreateWithoutPlanInput = {
    id?: string
    from: Date | string
    to: Date | string
    Exercise?: ExerciseUncheckedCreateNestedManyWithoutTrainInput
  }

  export type TrainCreateOrConnectWithoutPlanInput = {
    where: TrainWhereUniqueInput
    create: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput>
  }

  export type TrainCreateManyPlanInputEnvelope = {
    data: TrainCreateManyPlanInput | TrainCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutPlanInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    BodyPart?: BodyPartCreateNestedManyWithoutReportInput
    Profile: ProfileCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutPlanInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    profileId: string
    BodyPart?: BodyPartUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutPlanInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput>
  }

  export type ReportCreateManyPlanInputEnvelope = {
    data: ReportCreateManyPlanInput | ReportCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutPlansInput = {
    update: XOR<ProfileUpdateWithoutPlansInput, ProfileUncheckedUpdateWithoutPlansInput>
    create: XOR<ProfileCreateWithoutPlansInput, ProfileUncheckedCreateWithoutPlansInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutPlansInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutPlansInput, ProfileUncheckedUpdateWithoutPlansInput>
  }

  export type ProfileUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainee?: ProfileUpdateManyWithoutTrainerNestedInput
    Trainer?: ProfileUpdateOneWithoutTraineeNestedInput
    Report?: ReportUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    Trainee?: ProfileUncheckedUpdateManyWithoutTrainerNestedInput
    Report?: ReportUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ActivityUpsertWithWhereUniqueWithoutPlanInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutPlanInput, ActivityUncheckedUpdateWithoutPlanInput>
    create: XOR<ActivityCreateWithoutPlanInput, ActivityUncheckedCreateWithoutPlanInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutPlanInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutPlanInput, ActivityUncheckedUpdateWithoutPlanInput>
  }

  export type ActivityUpdateManyWithWhereWithoutPlanInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutPlanInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    name?: StringFilter<"Activity"> | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFilter<"Activity"> | $Enums.ACTIVITY_TYPE
    description?: StringNullableFilter<"Activity"> | string | null
    weight?: FloatNullableFilter<"Activity"> | number | null
    reps?: IntNullableFilter<"Activity"> | number | null
    sets?: IntNullableFilter<"Activity"> | number | null
    duration?: IntNullableFilter<"Activity"> | number | null
    planId?: StringFilter<"Activity"> | string
    reportExerciseId?: StringNullableFilter<"Activity"> | string | null
  }

  export type TrainUpsertWithWhereUniqueWithoutPlanInput = {
    where: TrainWhereUniqueInput
    update: XOR<TrainUpdateWithoutPlanInput, TrainUncheckedUpdateWithoutPlanInput>
    create: XOR<TrainCreateWithoutPlanInput, TrainUncheckedCreateWithoutPlanInput>
  }

  export type TrainUpdateWithWhereUniqueWithoutPlanInput = {
    where: TrainWhereUniqueInput
    data: XOR<TrainUpdateWithoutPlanInput, TrainUncheckedUpdateWithoutPlanInput>
  }

  export type TrainUpdateManyWithWhereWithoutPlanInput = {
    where: TrainScalarWhereInput
    data: XOR<TrainUpdateManyMutationInput, TrainUncheckedUpdateManyWithoutPlanInput>
  }

  export type TrainScalarWhereInput = {
    AND?: TrainScalarWhereInput | TrainScalarWhereInput[]
    OR?: TrainScalarWhereInput[]
    NOT?: TrainScalarWhereInput | TrainScalarWhereInput[]
    id?: StringFilter<"Train"> | string
    from?: DateTimeFilter<"Train"> | Date | string
    to?: DateTimeFilter<"Train"> | Date | string
    planId?: StringFilter<"Train"> | string
  }

  export type ReportUpsertWithWhereUniqueWithoutPlanInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutPlanInput, ReportUncheckedUpdateWithoutPlanInput>
    create: XOR<ReportCreateWithoutPlanInput, ReportUncheckedCreateWithoutPlanInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutPlanInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutPlanInput, ReportUncheckedUpdateWithoutPlanInput>
  }

  export type ReportUpdateManyWithWhereWithoutPlanInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanCreateWithoutActivityInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Trainee: ProfileCreateNestedOneWithoutPlansInput
    Train?: TrainCreateNestedManyWithoutPlanInput
    Report?: ReportCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutActivityInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
    Train?: TrainUncheckedCreateNestedManyWithoutPlanInput
    Report?: ReportUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutActivityInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutActivityInput, PlanUncheckedCreateWithoutActivityInput>
  }

  export type ExerciseCreateWithoutActivityInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    Train: TrainCreateNestedOneWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateWithoutActivityInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    trainId: string
  }

  export type ExerciseCreateOrConnectWithoutActivityInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput>
  }

  export type ExerciseCreateManyActivityInputEnvelope = {
    data: ExerciseCreateManyActivityInput | ExerciseCreateManyActivityInput[]
    skipDuplicates?: boolean
  }

  export type PlanUpsertWithoutActivityInput = {
    update: XOR<PlanUpdateWithoutActivityInput, PlanUncheckedUpdateWithoutActivityInput>
    create: XOR<PlanCreateWithoutActivityInput, PlanUncheckedCreateWithoutActivityInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutActivityInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutActivityInput, PlanUncheckedUpdateWithoutActivityInput>
  }

  export type PlanUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Trainee?: ProfileUpdateOneRequiredWithoutPlansNestedInput
    Train?: TrainUpdateManyWithoutPlanNestedInput
    Report?: ReportUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    Train?: TrainUncheckedUpdateManyWithoutPlanNestedInput
    Report?: ReportUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ExerciseUpsertWithWhereUniqueWithoutActivityInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutActivityInput, ExerciseUncheckedUpdateWithoutActivityInput>
    create: XOR<ExerciseCreateWithoutActivityInput, ExerciseUncheckedCreateWithoutActivityInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutActivityInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutActivityInput, ExerciseUncheckedUpdateWithoutActivityInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutActivityInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutActivityInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: StringFilter<"Exercise"> | string
    weight?: FloatNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    sets?: IntNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    description?: StringNullableFilter<"Exercise"> | string | null
    activityId?: StringFilter<"Exercise"> | string
    trainId?: StringFilter<"Exercise"> | string
  }

  export type PlanCreateWithoutTrainInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    Trainee: ProfileCreateNestedOneWithoutPlansInput
    Activity?: ActivityCreateNestedManyWithoutPlanInput
    Report?: ReportCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutTrainInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
    traineeId: string
    Activity?: ActivityUncheckedCreateNestedManyWithoutPlanInput
    Report?: ReportUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutTrainInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutTrainInput, PlanUncheckedCreateWithoutTrainInput>
  }

  export type ExerciseCreateWithoutTrainInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    Activity: ActivityCreateNestedOneWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateWithoutTrainInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    activityId: string
  }

  export type ExerciseCreateOrConnectWithoutTrainInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput>
  }

  export type ExerciseCreateManyTrainInputEnvelope = {
    data: ExerciseCreateManyTrainInput | ExerciseCreateManyTrainInput[]
    skipDuplicates?: boolean
  }

  export type PlanUpsertWithoutTrainInput = {
    update: XOR<PlanUpdateWithoutTrainInput, PlanUncheckedUpdateWithoutTrainInput>
    create: XOR<PlanCreateWithoutTrainInput, PlanUncheckedCreateWithoutTrainInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutTrainInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutTrainInput, PlanUncheckedUpdateWithoutTrainInput>
  }

  export type PlanUpdateWithoutTrainInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Trainee?: ProfileUpdateOneRequiredWithoutPlansNestedInput
    Activity?: ActivityUpdateManyWithoutPlanNestedInput
    Report?: ReportUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutTrainInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    Activity?: ActivityUncheckedUpdateManyWithoutPlanNestedInput
    Report?: ReportUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ExerciseUpsertWithWhereUniqueWithoutTrainInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutTrainInput, ExerciseUncheckedUpdateWithoutTrainInput>
    create: XOR<ExerciseCreateWithoutTrainInput, ExerciseUncheckedCreateWithoutTrainInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutTrainInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutTrainInput, ExerciseUncheckedUpdateWithoutTrainInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutTrainInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutTrainInput>
  }

  export type ActivityCreateWithoutExerciseInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    reportExerciseId?: string | null
    Plan: PlanCreateNestedOneWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutExerciseInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    planId: string
    reportExerciseId?: string | null
  }

  export type ActivityCreateOrConnectWithoutExerciseInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutExerciseInput, ActivityUncheckedCreateWithoutExerciseInput>
  }

  export type TrainCreateWithoutExerciseInput = {
    id?: string
    from: Date | string
    to: Date | string
    Plan: PlanCreateNestedOneWithoutTrainInput
  }

  export type TrainUncheckedCreateWithoutExerciseInput = {
    id?: string
    from: Date | string
    to: Date | string
    planId: string
  }

  export type TrainCreateOrConnectWithoutExerciseInput = {
    where: TrainWhereUniqueInput
    create: XOR<TrainCreateWithoutExerciseInput, TrainUncheckedCreateWithoutExerciseInput>
  }

  export type ActivityUpsertWithoutExerciseInput = {
    update: XOR<ActivityUpdateWithoutExerciseInput, ActivityUncheckedUpdateWithoutExerciseInput>
    create: XOR<ActivityCreateWithoutExerciseInput, ActivityUncheckedCreateWithoutExerciseInput>
    where?: ActivityWhereInput
  }

  export type ActivityUpdateToOneWithWhereWithoutExerciseInput = {
    where?: ActivityWhereInput
    data: XOR<ActivityUpdateWithoutExerciseInput, ActivityUncheckedUpdateWithoutExerciseInput>
  }

  export type ActivityUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
    Plan?: PlanUpdateOneRequiredWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    planId?: StringFieldUpdateOperationsInput | string
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrainUpsertWithoutExerciseInput = {
    update: XOR<TrainUpdateWithoutExerciseInput, TrainUncheckedUpdateWithoutExerciseInput>
    create: XOR<TrainCreateWithoutExerciseInput, TrainUncheckedCreateWithoutExerciseInput>
    where?: TrainWhereInput
  }

  export type TrainUpdateToOneWithWhereWithoutExerciseInput = {
    where?: TrainWhereInput
    data: XOR<TrainUpdateWithoutExerciseInput, TrainUncheckedUpdateWithoutExerciseInput>
  }

  export type TrainUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    Plan?: PlanUpdateOneRequiredWithoutTrainNestedInput
  }

  export type TrainUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    planId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfileCreateManyTrainerInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: number
  }

  export type PlanCreateManyTraineeInput = {
    id?: string
    title: string
    description?: string | null
    from?: Date | string
    to?: Date | string
    weekDay: $Enums.WEEK_DAYS
    trainerId: string
  }

  export type ReportCreateManyProfileInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    planId?: string | null
  }

  export type ProfileUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainee?: ProfileUpdateManyWithoutTrainerNestedInput
    Plans?: PlanUpdateManyWithoutTraineeNestedInput
    Report?: ReportUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    Trainee?: ProfileUncheckedUpdateManyWithoutTrainerNestedInput
    Plans?: PlanUncheckedUpdateManyWithoutTraineeNestedInput
    Report?: ReportUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
  }

  export type PlanUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Activity?: ActivityUpdateManyWithoutPlanNestedInput
    Train?: TrainUpdateManyWithoutPlanNestedInput
    Report?: ReportUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
    Activity?: ActivityUncheckedUpdateManyWithoutPlanNestedInput
    Train?: TrainUncheckedUpdateManyWithoutPlanNestedInput
    Report?: ReportUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateManyWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    weekDay?: EnumWEEK_DAYSFieldUpdateOperationsInput | $Enums.WEEK_DAYS
    trainerId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    BodyPart?: BodyPartUpdateManyWithoutReportNestedInput
    Plan?: PlanUpdateOneWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    BodyPart?: BodyPartUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    planId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BodyPartCreateManyReportInput = {
    id?: string
    name: string
    bodyFat?: number | null
  }

  export type BodyPartUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BodyPartUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BodyPartUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ActivityCreateManyPlanInput = {
    id?: string
    name: string
    ACTIVITY_TYPE: $Enums.ACTIVITY_TYPE
    description?: string | null
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    reportExerciseId?: string | null
  }

  export type TrainCreateManyPlanInput = {
    id?: string
    from: Date | string
    to: Date | string
  }

  export type ReportCreateManyPlanInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    imc?: number | null
    bodyFat?: number | null
    weight?: number | null
    profileId: string
  }

  export type ActivityUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
    Exercise?: ExerciseUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
    Exercise?: ExerciseUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ACTIVITY_TYPE?: EnumACTIVITY_TYPEFieldUpdateOperationsInput | $Enums.ACTIVITY_TYPE
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    reportExerciseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrainUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    Exercise?: ExerciseUpdateManyWithoutTrainNestedInput
  }

  export type TrainUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    Exercise?: ExerciseUncheckedUpdateManyWithoutTrainNestedInput
  }

  export type TrainUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    BodyPart?: BodyPartUpdateManyWithoutReportNestedInput
    Profile?: ProfileUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
    BodyPart?: BodyPartUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imc?: NullableFloatFieldUpdateOperationsInput | number | null
    bodyFat?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateManyActivityInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    trainId: string
  }

  export type ExerciseUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    Train?: TrainUpdateOneRequiredWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    trainId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseUncheckedUpdateManyWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    trainId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateManyTrainInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    duration?: number | null
    description?: string | null
    activityId: string
  }

  export type ExerciseUpdateWithoutTrainInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    Activity?: ActivityUpdateOneRequiredWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutTrainInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseUncheckedUpdateManyWithoutTrainInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}