import React from "react";
import Phaser from "phaser";

// Phaser Game Scene
class ConverSationScene extends Phaser.Scene {
  private textBox: Phaser.GameObjects.Rectangle | null = null;
  private textContent: Phaser.GameObjects.Text | null = null;
  private characterPortrait: Phaser.GameObjects.Image | null = null;
  private currentTextIndex: number = 0;
  private dialogue: { speaker: string; text: string; portrait: string }[] = [
    { speaker: "name1", text: "어서 와! 늦었네.", portrait: "hero" },
    {
      speaker: "name1",
      text: "미안.",
      portrait: "villager",
    },
    {
      speaker: "name1",
      text: "무엇을 할 수 있을까?",
      portrait: "hero",
    },
    {
      speaker: "name2",
      text: "우선 주변을 둘러보고!",
      portrait: "villager",
    },
  ];

  constructor() {
    super({ key: "ConverSationScene" });
  }

  preload() {
    this.load.image("background", "/sdsgame/minbus.jpg");
    this.load.image("hero", "/sdsgame/player.png");
    this.load.image("villager", "/sdsgame/player.png");
  }

  create() {
    // Add background
    this.add.image(400, 300, "background");

    // Create text box
    this.textBox = this.add.rectangle(400, 500, 760, 120, 0x000000, 0.7);
    this.textContent = this.add.text(120, 460, "", {
      font: "16px Arial",
      color: "#FFFFFF",
      wordWrap: { width: 600 },
    });

    // Add character portrait
    this.characterPortrait = this.add
      .image(60, 470, "hero")
      .setOrigin(0.5, 0.5)
      .setScale(1.5);

    // Start dialogue
    this.updateDialogue();

    // Advance text on click
    this.input.on("pointerdown", () => {
      this.advanceText();
    });
  }

  updateDialogue() {
    if (
      this.textContent &&
      this.characterPortrait &&
      this.currentTextIndex < this.dialogue.length
    ) {
      const currentDialogue = this.dialogue[this.currentTextIndex];
      this.textContent.setText(
        `${currentDialogue.speaker}: ${currentDialogue.text}`
      );
      this.characterPortrait.setTexture(currentDialogue.portrait);
    }
  }

  advanceText() {
    this.currentTextIndex++;
    if (this.currentTextIndex < this.dialogue.length) {
      this.updateDialogue();
    } else {
      this.textContent?.setText("대화가 끝났습니다.");
    }
  }
}

// Phaser Game Config
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [ConverSationScene],
  parent: "phaser-container",
};

// React Component
const ConverSation = () => {
  React.useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="phaser-container" style={{ width: "800px", height: "600px" }} />
  );
};

export default ConverSation;
