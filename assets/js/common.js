$(document).ready(function () {
  // shooter
  const shooter = $(".shooter");
  const guns = ["pistol", "ar", "shotgun"];
  if (shooter.length) {
    let gun = 0;
    $("body").css("cursor", "crosshair");

    // Use css transform rotation to rotate the shooter to always point at the user's cursor
    // I need to know the center of the shooter to do this
    let shooterCenter = {
      x: shooter.width() / 2,
      y: shooter.height() / 4,
    };
    let targets = [];
    let scoreboard;
    let score = 0;
    let scoreTotal = 0;

    shooter.on("mousedown pointerdown", function (event) {
      event.preventDefault();
      event.stopPropagation();
      gun = (gun + 1) % guns.length;
      guns.forEach((g, i) => {
        if (i === gun) $("body").addClass(g);
        else $("body").removeClass(g);
      });
      shooterCenter = ["ar", "shotgun"].includes(guns[gun])
        ? {
            x: shooter.width() / 2,
            y: shooter.height() / 2.1,
          }
        : {
            x: shooter.width() / 2,
            y: shooter.height() / 4,
          };
    });

    // I also need to know the position of the shooter on the page
    // I need to know the angle between the shooter and the cursor
    // I need to know the position of the cursor
    $(document).on("pointerdown mousemove", function (event) {
      const cursor = {
        x: event.pageX,
        y: event.pageY,
      };
      // I need to know the angle between the shooter and the cursor
      const angle = Math.atan2(cursor.y - shooter.offset().top - shooterCenter.y, cursor.x - shooter.offset().left - shooterCenter.x);
      // I want to rotate the shooter to always point at the user's cursor
      // If the cursor position is to the left of the shooter, I want to flip the shooter
      if (cursor.x > shooter.offset().left + shooterCenter.x) {
        shooter.css("transform", "rotate(" + angle + "rad)");
      } else {
        shooter.css("transform", "rotate(" + (angle + Math.PI) + "rad) scaleX(-1)");
      }
    });

    // When the user clicks, fire a bullet
    $(document).on("mousedown pointerdown", function (event) {
      const cursor = {
        x: event.pageX,
        y: event.pageY,
      };
      if (scoreTotal === 0) {
        createTargets({
          left: cursor.x,
          top: cursor.y,
        });
      }
      if (!scoreboard) createScoreboard();

      if (guns[gun] === "ar") {
        let currentCursor = cursor;
        function updateCursor(event) {
          currentCursor = {
            x: event.pageX,
            y: event.pageY,
          };
        }
        $(document).on("mousemove pointermove", updateCursor);
        const interval = setInterval(() => {
          createAndLaunchBullet(currentCursor);
        }, 100);
        $(document).one("mouseup pointerup", function () {
          clearInterval(interval);
          $(document).off("mousemove pointermove", updateCursor);
        });
      } else if (guns[gun] === "shotgun") {
        for (let i = 0; i < 5; i++) {
          createAndLaunchBullet({
            x: cursor.x + Math.random() * 100 - 50,
            y: cursor.y + Math.random() * 100 - 50,
          });
        }
      } else {
        // I want to create a bullet
        createAndLaunchBullet(cursor);
      }
    });

    function createMiniSpawn(position) {
      for (let i = 0; i < 3; i++) {
        const pointValue = 2;
        scoreTotal += pointValue;
        const target = $('<i class="fa-solid target grahamer mini" data-point-value="' + pointValue + '"></i>');
        target.css("left", position.x - 32);
        target.css("top", position.y - 32);
        $("body").append(target);
        targets.push(target);
        makeItMoveLinearly(target);
      }
    }

    function createMicroSpawn(position) {
      for (let i = 0; i < 5; i++) {
        const pointValue = 1;
        scoreTotal += pointValue;
        const target = $('<i class="fa-solid target grahamer micro" data-point-value="' + pointValue + '"></i>');
        target.css("left", position.x - 16);
        target.css("top", position.y - 16);
        $("body").append(target);
        targets.push(target);
        makeItMoveErratically(target);
      }
    }

    function createTargets(firstPosition) {
      if (score < 10) {
        // level 1
        const possiblePoints = 10;
        console.log("creating level 1", score, scoreTotal, possiblePoints);
        scoreTotal += possiblePoints;
        for (let i = 0; i < possiblePoints; i++) {
          const pointValue = 1;
          const target = $('<i class="fa-solid fa-bullseye target" data-point-value="' + pointValue + '"></i>');
          target.css("left", firstPosition ? firstPosition.left : Math.random() * (window.innerWidth - 32));
          target.css("top", firstPosition ? firstPosition.top : Math.random() * ($(document).height() - 32));
          firstPosition = null;
          $("body").append(target);
          targets.push(target);
        }
      } else if (score < 20) {
        // level 2
        const pointValue = 3;
        const targetCount = 15;
        const possiblePoints = pointValue * targetCount;
        console.log("creating level 2", score, scoreTotal, possiblePoints);
        scoreTotal += possiblePoints;
        for (let i = 0; i < targetCount; i++) {
          const target = $('<i class="fa-solid fa-bullseye target" data-point-value="' + pointValue + '"></i>');
          target.css("left", Math.random() * (window.innerWidth - 32));
          target.css("top", Math.random() * ($(document).height() - 32));
          $("body").append(target);
          targets.push(target);
          makeItMoveLinearly(target);
        }
      } else if (score < 30) {
        // level 3
        const pointValue = 5;
        const targetCount = 15;
        const possiblePoints = pointValue * targetCount;
        console.log("creating level 3", score, scoreTotal, possiblePoints);
        scoreTotal += possiblePoints;
        for (let i = 0; i < 15; i++) {
          const target = $('<i class="fa-solid grahamer target" data-point-value="' + pointValue + '"></i>');
          target.css("left", Math.random() * (window.innerWidth - 64));
          target.css("top", Math.random() * ($(document).height() - 32));
          $("body").append(target);
          targets.push(target);
          makeItMoveErratically(target);
        }
      } else if (score < 45) {
        // level 4
        const pointValue = 10;
        console.log("creating level 4", score, scoreTotal, pointValue);
        scoreTotal += pointValue;
        const target = $('<i class="fa-solid grahamer target mega" data-point-value="' + pointValue + '" data-sensitivity="64"></i>');
        target.css("left", Math.random() * (window.innerWidth - 64));
        target.css("top", Math.random() * ($(document).height() - 32));
        $("body").append(target);
        targets.push(target);
        // cause this target to ping around the page, but moving more eratically, not just in straight lines, still bouncing off the edges when it reaches them
        let speed = Math.random() * 10 + 5;
        let angle = Math.random() * Math.PI * 2;
        let direction = {
          x: Math.cos(angle),
          y: Math.sin(angle),
        };
        const position = target.position();
        const interval = setInterval(() => {
          // randomly change speed, angle, and direction 10% of the time
          if (Math.random() < 0.1) {
            speed = Math.random() * 10 + 5;
            angle = Math.random() * Math.PI * 2;
            direction = {
              x: Math.cos(angle),
              y: Math.sin(angle),
            };
          }
          position.left += direction.x * speed;
          position.top += direction.y * speed;
          if (position.left < 0 || position.left > window.innerWidth - 64) {
            direction.x *= -1;
          }
          if (position.top < 0 || position.top > $(document).height() - 32) {
            direction.y *= -1;
          }
          target.css("left", position.left);
          target.css("top", position.top);
        }, 100);
        target.data("interval", interval);
      }
    }

    function makeItMoveLinearly(target) {
      const speed = Math.random() * 10 + 5;
      const angle = Math.random() * Math.PI * 2;
      const direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
      const position = target.position();
      const interval = setInterval(() => {
        position.left += direction.x * speed;
        position.top += direction.y * speed;
        if (position.left < 0 || position.left > window.innerWidth - 32) {
          direction.x *= -1;
        }
        if (position.top < 0 || position.top > $(document).height() - 32) {
          direction.y *= -1;
        }
        target.css("left", position.left);
        target.css("top", position.top);
      }, 100);
      target.data("interval", interval);
    }

    function makeItMoveErratically(target) {
      let speed = Math.random() * 10 + 5;
      let angle = Math.random() * Math.PI * 2;
      let direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
      const position = target.position();
      const interval = setInterval(() => {
        // randomly change speed, angle, and direction 2% of the time
        if (Math.random() < 0.1) {
          speed = Math.random() * 10 + 5;
          angle = Math.random() * Math.PI * 2;
          direction = {
            x: Math.cos(angle),
            y: Math.sin(angle),
          };
        }
        position.left += direction.x * speed;
        position.top += direction.y * speed;
        if (position.left < 0 || position.left > window.innerWidth - 64) {
          direction.x *= -1;
        }
        if (position.top < 0 || position.top > $(document).height() - 32) {
          direction.y *= -1;
        }
        target.css("left", position.left);
        target.css("top", position.top);
      }, 100);
      target.data("interval", interval);
    }

    function createScoreboard() {
      scoreboard = $('<div class="scoreboard"></div>');
      $("body").append(scoreboard);
      updateScoreboard();
    }

    function updateScoreboard() {
      scoreboard.text("Score: " + score + "/" + scoreTotal);
    }

    function createAndLaunchBullet(cursor) {
      const bullet = $('<div class="bullet"></div>');
      // I want to position the bullet at the center of the shooter
      bullet.css("left", shooter.offset().left + shooterCenter.x);
      bullet.css("top", shooter.offset().top + shooterCenter.y);
      // I want to append the bullet to the body
      $("body").append(bullet);
      // I want to animate the bullet to the cursor
      // Calculate the duration based on the distance needed to travel
      const distance = Math.sqrt(
        Math.pow(cursor.x - (shooter.offset().left + shooterCenter.x), 2) + Math.pow(cursor.y - (shooter.offset().top + shooterCenter.y), 2)
      );
      bullet.animate(
        {
          left: cursor.x,
          top: cursor.y,
        },
        distance,
        "linear",
        function () {
          // I want to remove the bullet from the DOM
          bullet.remove();
          // I want to remove the target from the DOM
          for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            const sensitivity = parseInt(target.attr("data-sensitivity")) || 20;
            const targetPosition = target.offset();
            const targetCenter = {
              x: target.width() / 2,
              y: target.height() / 2,
            };
            const distance = Math.sqrt(
              Math.pow(targetPosition.left + targetCenter.x - cursor.x, 2) + Math.pow(targetPosition.top + targetCenter.y - cursor.y, 2)
            );
            if (distance < sensitivity) {
              const pointValue = parseInt(target.attr("data-point-value")) || 1;
              console.log("hit target with point value", pointValue);
              const shouldSpawnMini = target.hasClass("mega");
              const shouldSpawnMicro = target.hasClass("mini");
              target.remove();
              targets.splice(i, 1);
              score += pointValue;
              updateScoreboard();
              if (shouldSpawnMini) {
                createMiniSpawn(cursor);
              } else if (shouldSpawnMicro) {
                createMicroSpawn(cursor);
              }
              break;
            }
          }
          if (targets.length === 0) {
            createTargets();
          }
        }
      );
    }
  }
});
