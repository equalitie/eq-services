/**
 * {{ansible_managed}}
 *
 * The ApiUser objects are used for authentication against the API.
 *
 */
object ApiUser "{{item}}" {
  client_cn = "{{item}}"
  permissions = [ "*" ]
}
