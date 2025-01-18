import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const ChessBoard: React.FC = () => {
  const phaserGameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: phaserGameRef.current as HTMLElement,
      width: 800, // 화면 크기
      height: 600,
      scene: {
        preload,
        create,
        update,
      },
      physics: {
        default: "arcade",
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      // 체스판 패턴을 미리 로드
      this.textures.generate("chessboard", {
        data: [
          "12121212",
          "21212121",
          "12121212",
          "21212121",
          "12121212",
          "21212121",
          "12121212",
          "21212121",
        ],
        pixelWidth: 32,
        palette: {
          0: "#000000", // 기본 색상
          1: "#FFFFFF", // 흰색
          2: "#000000", // 검은색
          3: "#000000", // 더미
          4: "#000000", // 더미
          5: "#000000", // 더미
          6: "#000000", // 더미
          7: "#000000", // 더미
          8: "#000000", // 더미
          9: "#000000", // 더미
          10: "#000000", // 더미
          11: "#000000", // 더미
          12: "#000000", // 더미
          13: "#000000", // 더미
          14: "#000000", // 더미
          15: "#000000", // 더미
        } as unknown as Phaser.Types.Create.Palette, // 타입 단언 추가
      });
    }

    function create(this: Phaser.Scene) {
      // 체스판 타일을 추가
      const tileSprite = this.add
        .tileSprite(0, 0, 1600, 1200, "chessboard")
        .setOrigin(0.5, 0.5);
      this.cameras.main.startFollow(tileSprite, true, 0.05, 0.05);
      this.cameras.main.setZoom(1.2); // 줌 설정
      this.cameras.main.centerOn(0, 0); // 체스판 중앙으로 이동

      // 키보드 입력 추가
      const cursors = this.input.keyboard?.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      });

      this.events.on("update", () => {
        const cursorKeys = cursors as Phaser.Types.Input.Keyboard.CursorKeys;
        if (cursorKeys.up?.isDown) {
          this.cameras.main.scrollY -= 5;
        }
        if (cursorKeys.down?.isDown) {
          this.cameras.main.scrollY += 5;
        }
        if (cursorKeys.left?.isDown) {
          this.cameras.main.scrollX -= 5;
        }
        if (cursorKeys.right?.isDown) {
          this.cameras.main.scrollX += 5;
          this.cameras.main.scrollX += 5;
        }
      });
    }

    function update(this: Phaser.Scene) {
      // 매 프레임 업데이트 처리
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={phaserGameRef} style={{ width: "100%", height: "100%" }} />;
};

export default ChessBoard;
