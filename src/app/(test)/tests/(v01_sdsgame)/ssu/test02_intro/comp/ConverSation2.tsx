import React from "react";
import Phaser from "phaser";

// Phaser Game Scene
class RPGVisualNovelScene extends Phaser.Scene {
  private textBox: Phaser.GameObjects.Rectangle | null = null;
  private textContent: Phaser.GameObjects.Text | null = null;
  private leftCharacter: Phaser.GameObjects.Image | null = null;
  private rightCharacter: Phaser.GameObjects.Image | null = null;
  private currentTextIndex: number = 0;
  private dialogue: { speaker: string; text: string }[] = [
    { speaker: "player1", text: "대사1" },
    { speaker: "player2", text: "DaeSa1" },
    { speaker: "player1", text: "대사2" },
    { speaker: "player2", text: "DaeSa2" },
    { speaker: "player1", text: "대사3" },
    { speaker: "player2", text: "DaeSa3" },
    { speaker: "player1", text: "대사4" },
    { speaker: "player2", text: "DaeSa4" },
    { speaker: "player1", text: "대사5" },
    { speaker: "player2", text: "DaeSa5" },
    { speaker: "player1", text: "대사6" },
    { speaker: "player2", text: "DaeSa6" },
  ];

  constructor() {
    super({ key: "RPGVisualNovelScene" });
  }

  preload() {
    this.load.spritesheet("player1", "/sdsgame/player.png", {
      frameWidth: 32,
      frameHeight: 36,
    });
    this.load.spritesheet("player2", "/sdsgame/player.png", {
      frameWidth: 32,
      frameHeight: 36,
    });
    this.load.image("background", "/sdsgame/Background2.png");
  }

  create() {
    // Add background
    this.add.image(400, 300, "background");

    // Create characters
    this.leftCharacter = this.add
      .image(150, 400, "player1", 0)
      .setOrigin(0.5, 1)
      .setScale(2);
    this.rightCharacter = this.add
      .image(650, 400, "player2", 0)
      .setOrigin(0.5, 1)
      .setScale(2);

    // Create text box
    this.textBox = this.add.rectangle(400, 500, 760, 120, 0x000000, 0.7);
    this.textContent = this.add.text(120, 460, "", {
      font: "16px Arial",
      color: "#FFFFFF",
      wordWrap: { width: 600 },
    });

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
      this.leftCharacter &&
      this.rightCharacter &&
      this.currentTextIndex < this.dialogue.length
    ) {
      const currentDialogue = this.dialogue[this.currentTextIndex];
      this.textContent.setText(
        `${currentDialogue.speaker}: ${currentDialogue.text}`
      );

      // Highlight speaking character
      if (currentDialogue.speaker === "player1") {
        this.leftCharacter.setFrame(0); // Idle frame
        this.rightCharacter.setFrame(1); // Dim or inactive frame
      } else if (currentDialogue.speaker === "player2") {
        this.leftCharacter.setFrame(1); // Dim or inactive frame
        this.rightCharacter.setFrame(0); // Idle frame
      }
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
  scene: [RPGVisualNovelScene],
  parent: "phaser-container",
};

// React Component
const RPGVisualNovel: React.FC = () => {
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

export default RPGVisualNovel;
