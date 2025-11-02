// Define the contract/interface that all input sources must follow
// any kind of input can implement this eg:(keyboard)
export class InputComponent {
   private up: boolean
   private down: boolean
   private left: boolean
   private right: boolean
   private W: boolean
   private S: boolean
   private A: boolean
   private D: boolean
   private escapeKey: boolean

   constructor() {
      this.up = false
      this.down = false
      this.left = false
      this.right = false
      this.W = false
      this.S = false
      this.A = false
      this.D = false
      this.escapeKey = false
   }
   set isUpDown(val: boolean) {
      this.up = val
   }
   get isUpDown() {
      return this.up
   }
   set isDownDown(val: boolean) {
      this.down = val
   }
   get isDownDown() {
      return this.down
   }
   set isLeftDown(val: boolean) {
      this.left = val
   }
   get isLeftDown() {
      return this.left
   }
   set isRightDown(val: boolean) {
      this.right = val
   }
   get isRightDown() {
      return this.right
   }
   set isWDown(val: boolean) {
      this.W = val
   }
   get isWDown() {
      return this.W
   }
   set isSDown(val: boolean) {
      this.S = val
   }
   get isSDown() {
      return this.S
   }
   set isADown(val: boolean) {
      this.A = val
   }
   get isADown() {
      return this.A
   }
   set isDDown(val: boolean) {
      this.D = val
   }
   get isDDown() {
      return this.D
   }
   set isEscapeKeyDown(val: boolean) {
      this.escapeKey = val
   }
   get isEscapeKeyDown() {
      return this.escapeKey
   }
   public reset(): void {
      this.up = false
      this.down = false
      this.left = false
      this.right = false
      this.W = false
      this.S = false
      this.A = false
      this.D = false
      this.escapeKey = false
   }
}
