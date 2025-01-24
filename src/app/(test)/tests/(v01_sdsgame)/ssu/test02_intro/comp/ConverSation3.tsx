import React from "react";
import Phaser from "phaser";

class RPGVisualNovelScene extends Phaser.Scene {
  private textBox: Phaser.GameObjects.Rectangle | null = null;
  private textContent: Phaser.GameObjects.Text | null = null;
  private leftCharacter: Phaser.GameObjects.Sprite | null = null;
  private rightCharacter: Phaser.GameObjects.Image | null = null;
  private wasdKeys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  } | null = null;
  private dialogueVisible: boolean = false; // 대화창 상태
  private currentTextIndex: number = 0;

  private dialogue: { speaker: string; text: string }[] = [
    { speaker: "player1", text: "안녕하세요, Player2!" },
    { speaker: "player2", text: "안녕하세요, Player1!" },
    { speaker: "player1", text: "오늘도 평화로운 날이네요." },
    { speaker: "player2", text: "맞아요! 좋은 하루 보내세요." },
    { speaker: "player1", text: "대화3." },
    { speaker: "player2", text: "대화4." },
    { speaker: "player1", text: "대화5" },
    { speaker: "player2", text: "대화6" },
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
      .sprite(150, 400, "player1", 0)
      .setOrigin(0.5, 1)
      .setScale(2)
      .setFlipX(true); // 좌우 반전 설정

    this.rightCharacter = this.add
      .image(650, 400, "player2")
      .setOrigin(0.5, 1)
      .setScale(2);

    // Create text box
    this.textBox = this.add
      .rectangle(400, 500, 760, 120, 0x000000, 0.7)
      .setVisible(false);
    this.textContent = this.add
      .text(80, 460, "", {
        font: "20px Arial", // 텍스트 크기를 키움
        color: "#FFFFFF",
        wordWrap: { width: 640 }, // 너비를 늘림
      })
      .setVisible(false);

    // Define animations
    this.anims.create({
      key: "player_walk",
      frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player_idle",
      frames: [{ key: "player1", frame: 0 }],
      frameRate: 1,
    });

    // WASD input
    if (this.input.keyboard) {
      this.wasdKeys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
    }

    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      // 단순히 거리 조건만 확인하도록 수정
      if (this.leftCharacter && this.rightCharacter) {
        const distance = Phaser.Math.Distance.Between(
          this.leftCharacter.x,
          this.leftCharacter.y,
          this.rightCharacter.x,
          this.rightCharacter.y
        );

        if (distance < 50) {
          this.startDialogue();
        }
      }
    });
  }

  update() {
    if (!this.dialogueVisible && this.leftCharacter && this.wasdKeys) {
      const speed = 2;
      let moving = false;

      // Movement using WASD keys
      if (this.wasdKeys.A.isDown) {
        this.leftCharacter.x -= speed;
        this.leftCharacter.flipX = false; // 좌측 이동 시 좌우 반전
        moving = true;
      } else if (this.wasdKeys.D.isDown) {
        this.leftCharacter.x += speed;
        this.leftCharacter.flipX = true; // 우측 이동 시 반전 해제
        moving = true;
      }

      if (this.wasdKeys.W.isDown) {
        this.leftCharacter.y -= speed;
        moving = true;
      } else if (this.wasdKeys.S.isDown) {
        this.leftCharacter.y += speed;
        moving = true;
      }

      // Animation
      if (moving) {
        this.leftCharacter.play("player_walk", true);
      } else {
        this.leftCharacter.play("player_idle", true);
      }
    }
  }

  startDialogue() {
    if (this.dialogueVisible) return; // 이미 대화 중이면 실행하지 않음

    if (this.textBox && this.textContent) {
      this.dialogueVisible = true;
      this.textBox.setVisible(true);
      this.textContent.setVisible(true);
      this.currentTextIndex = 0;
      this.updateDialogue();

      // Disable keyboard input during dialogue
      if (this.input.keyboard) {
        this.input.keyboard.enabled = false;
      }

      // Advance text on each click
      this.input.on("pointerdown", this.advanceText, this);
    }
  }

  updateDialogue() {
    if (
      this.textContent &&
      this.leftCharacter &&
      this.rightCharacter &&
      this.dialogue.length > 0 && // 대화 배열이 비어 있는지 확인
      this.currentTextIndex < this.dialogue.length
    ) {
      const currentDialogue = this.dialogue[this.currentTextIndex];
      this.textContent.setText(
        `${currentDialogue.speaker}: ${currentDialogue.text}`
      );

      // 캐릭터 강조
      if (currentDialogue.speaker === "player1") {
        this.leftCharacter.setAlpha(1);
        this.rightCharacter.setAlpha(0.5);
      } else {
        this.leftCharacter.setAlpha(0.5);
        this.rightCharacter.setAlpha(1);
      }
    }
  }

  advanceText() {
    this.currentTextIndex++;
    if (this.currentTextIndex < this.dialogue.length) {
      this.updateDialogue();
    } else {
      this.endDialogue();
    }
  }

  endDialogue() {
    if (this.textBox && this.textContent) {
      this.dialogueVisible = false;
      this.textBox.setVisible(false);
      this.textContent.setVisible(false);

      // Re-enable keyboard input
      if (this.input.keyboard) {
        this.input.keyboard.enabled = true;
      }

      // Reset character highlights
      this.leftCharacter?.setAlpha(1);
      this.rightCharacter?.setAlpha(1);

      // Remove pointerdown listener
      this.input.off("pointerdown", this.advanceText, this);
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

const RPGVisualNovel = () => {
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
