class Vector3 {
  constructor (x, y, z) {
    const clone = x instanceof Vector3 ? x : { x, y, z }
    this.x = clone.x || 0
    this.y = clone.y || 0
    this.z = clone.z || 0
  }
  dot (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }
  plus (v) {
    if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
    return new Vector3(this.x + v, this.y + v, this.z + v)
  }
  minus (v) {
    if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
    return new Vector3(this.x - v, this.y - v, this.z - v)
  }
  scaledBy (v) {
    if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z)
    return new Vector3(this.x * v, this.y * v, this.z * v)
  }
  dividedBy (v) {
    if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
    return new Vector3(this.x / v, this.y / v, this.z / v)
  }
  reflectedBy(angle) {
    const cos = this.dot(angle)
    return angle.minus(this.scaledBy(2 * cos))
  }
  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }
  get length() {
    return Math.sqrt(this.dot(this))
  }
  get array() {
    return [this.x, this.y, this.z]
  }
  get normalized() {
    return this.dividedBy(this.length)
  }
  get randomInHemisphere() {
    const rand = Vector3.randomInSphere()
    return this.dot(rand) > 0 ? rand : rand.scaledBy(-1)
  }
  add (v) {
    if (v instanceof Vector3) { this.x += v.x; this.y += v.y; this.z += v.z }
    else { this.x += v; this.y += v; this.z += v }
    return this
  }
  static sum(...vectors) {
    return vectors.reduce((total, v) => total.add(v), new Vector3())
  }
  static fromAngles (theta, phi) {
    return new Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi))
  }
  static randomInSphere () {
    return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1))
  }
}