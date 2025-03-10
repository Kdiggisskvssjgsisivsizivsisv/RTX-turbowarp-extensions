class RTXExtension {
    constructor() {
      this.spriteSettings = {};
      this.backdropSettings = {};
    }
  
    getInfo() {
      return {
        id: 'rtxExtension',
        name: 'RTX Effects',
        blocks: [
          {
            opcode: 'setSpriteLightIntensity',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set sprite [SPRITE] light intensity to [INTENSITY]',
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' },
              INTENSITY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'getSpriteLightIntensity',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Sprite [SPRITE] light intensity',
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
            }
          },
          {
            opcode: 'setBackdropLightIntensity',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set backdrop light intensity to [INTENSITY]',
            arguments: {
              INTENSITY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'getBackdropLightIntensity',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Backdrop light intensity'
          }
        ]
      };
    }
  
    setSpriteLightIntensity(args) {
      if (!this.spriteSettings[args.SPRITE]) this.spriteSettings[args.SPRITE] = {};
      this.spriteSettings[args.SPRITE].intensity = args.INTENSITY;
    }
  
    getSpriteLightIntensity(args) {
      return (this.spriteSettings[args.SPRITE] && this.spriteSettings[args.SPRITE].intensity) || 1;
    }
  
    setBackdropLightIntensity(args) {
      this.backdropSettings.intensity = args.INTENSITY;
    }
  
    getBackdropLightIntensity() {
      return this.backdropSettings.intensity || 1;
    }
  }
  
  Scratch.extensions.register(new RTXExtension());
  