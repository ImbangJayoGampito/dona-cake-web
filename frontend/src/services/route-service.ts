export class RouteService {
  public static replaceParams(
    route: string,
    params: Record<string, string>
  ): string {
    let result = route
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, String(value))
    })
    return result
  }
}
