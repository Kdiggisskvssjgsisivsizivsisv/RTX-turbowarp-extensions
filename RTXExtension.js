const extension = (() => {
    // Default values for settings
    let spriteSettings = {};  // Stores settings for each sprite
    let backdropSettings = {};  // Stores settings for the backdrop

    // Helper to get or set the light intensity for a sprite or backdrop
    const getOrSetIntensity = (target, value = null) => {
        if (value !== null) {
            // Set the value
            target.intensity = value;
        }
        return target.intensity || 1; // Default value is 1
    };

    // Helper to get or set shadow for sprite or backdrop
    const getOrSetShadow = (target, value = null) => {
        if (value !== null) {
            target.shadow = value;
        }
        return target.shadow || 0; // Default shadow is 0
    };

    // Blocks to edit sprite and backdrop RTX-like settings
    return {
        name: 'RTX Effects',
        description: 'Adjust RTX-like effects for Sprites and Backdrops independently.',
        
        blocks: [
            // Sprite settings: Light intensity
            {
                opcode: 'setSpriteLightIntensity',
                blockType: BlockType.COMMAND,
                text: 'Set sprite [SPRITE] light intensity to [INTENSITY]',
                arguments: {
                    SPRITE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Sprite1',
                    },
                    INTENSITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1,
                    },
                },
                func: function (args) {
                    let sprite = spriteSettings[args.SPRITE] || {};
                    spriteSettings[args.SPRITE] = sprite;
                    sprite.intensity = args.INTENSITY;
                    return `Set light intensity for ${args.SPRITE} to ${args.INTENSITY}`;
                },
            },

            // Sprite settings: Shadow intensity
            {
                opcode: 'setSpriteShadow',
                blockType: BlockType.COMMAND,
                text: 'Set sprite [SPRITE] shadow to [SHADOW]',
                arguments: {
                    SPRITE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Sprite1',
                    },
                    SHADOW: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 0,
                    },
                },
                func: function (args) {
                    let sprite = spriteSettings[args.SPRITE] || {};
                    spriteSettings[args.SPRITE] = sprite;
                    sprite.shadow = args.SHADOW;
                    return `Set shadow for ${args.SPRITE} to ${args.SHADOW}`;
                },
            },

            // Backdrop settings: Light intensity
            {
                opcode: 'setBackdropLightIntensity',
                blockType: BlockType.COMMAND,
                text: 'Set backdrop light intensity to [INTENSITY]',
                arguments: {
                    INTENSITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1,
                    },
                },
                func: function (args) {
                    backdropSettings.intensity = args.INTENSITY;
                    return `Set backdrop light intensity to ${args.INTENSITY}`;
                },
            },

            // Backdrop settings: Shadow intensity
            {
                opcode: 'setBackdropShadow',
                blockType: BlockType.COMMAND,
                text: 'Set backdrop shadow to [SHADOW]',
                arguments: {
                    SHADOW: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 0,
                    },
                },
                func: function (args) {
                    backdropSettings.shadow = args.SHADOW;
                    return `Set backdrop shadow to ${args.SHADOW}`;
                },
            },

            // Sprite settings: Get light intensity
            {
                opcode: 'getSpriteLightIntensity',
                blockType: BlockType.REPORTER,
                text: 'Sprite [SPRITE] light intensity',
                arguments: {
                    SPRITE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Sprite1',
                    },
                },
                func: function (args) {
                    const sprite = spriteSettings[args.SPRITE] || {};
                    return sprite.intensity || 1;  // Return current light intensity
                },
            },

            // Backdrop settings: Get light intensity
            {
                opcode: 'getBackdropLightIntensity',
                blockType: BlockType.REPORTER,
                text: 'Backdrop light intensity',
                func: function () {
                    return backdropSettings.intensity || 1;  // Return backdrop light intensity
                },
            },
        ],

        // Custom UI elements for interacting with the settings
        createSettingsUI: function () {
            const spriteContainer = document.createElement('div');
            spriteContainer.innerHTML = '<h3>Sprite Settings</h3>';

            // Create settings for each sprite
            const spriteSliderContainer = document.createElement('div');
            spriteSliderContainer.innerHTML = '<label>Light Intensity:</label>';

            const spriteIntensitySlider = document.createElement('input');
            spriteIntensitySlider.type = 'range';
            spriteIntensitySlider.min = 0;
            spriteIntensitySlider.max = 10;
            spriteIntensitySlider.step = 0.1;
            spriteIntensitySlider.value = 1;
            spriteIntensitySlider.addEventListener('input', (event) => {
                const sprite = spriteSettings['Sprite1'] || {};
                spriteSettings['Sprite1'] = sprite;
                sprite.intensity = event.target.value;
                console.log(`Sprite light intensity: ${sprite.intensity}`);
            });

            spriteSliderContainer.appendChild(spriteIntensitySlider);
            spriteContainer.appendChild(spriteSliderContainer);

            // Create backdrop settings
            const backdropContainer = document.createElement('div');
            backdropContainer.innerHTML = '<h3>Backdrop Settings</h3>';

            const backdropSliderContainer = document.createElement('div');
            backdropSliderContainer.innerHTML = '<label>Backdrop Light Intensity:</label>';

            const backdropIntensitySlider = document.createElement('input');
            backdropIntensitySlider.type = 'range';
            backdropIntensitySlider.min = 0;
            backdropIntensitySlider.max = 10;
            backdropIntensitySlider.step = 0.1;
            backdropIntensitySlider.value = 1;
            backdropIntensitySlider.addEventListener('input', (event) => {
                backdropSettings.intensity = event.target.value;
                console.log(`Backdrop light intensity: ${backdropSettings.intensity}`);
            });

            backdropSliderContainer.appendChild(backdropIntensitySlider);
            backdropContainer.appendChild(backdropSliderContainer);

            document.body.appendChild(spriteContainer);
            document.body.appendChild(backdropContainer);
        },

        // Initialize the settings UI
        init: function () {
            this.createSettingsUI();
        },
    };
})();

export default extension;
