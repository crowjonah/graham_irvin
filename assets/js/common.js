$(document).ready(function () {
  // shooter
  const shooter = $(".shooter");
  if (shooter.length) {
    // set cursor: crosshair on body
    $("body").css("cursor", "crosshair");
    // I want to use css transform rotation to rotate the shooter to always point at the user's cursor
    // I need to know the center of the shooter to do this
    const shooterCenter = {
      x: shooter.width() / 2,
      y: shooter.height() / 4,
    };
    // I also need to know the position of the shooter on the page
    const shooterPosition = shooter.offset();
    // I need to know the angle between the shooter and the cursor
    // I need to know the position of the cursor
    $(document).mousemove(function (event) {
      const cursor = {
        x: event.pageX,
        y: event.pageY,
      };
      // I need to know the angle between the shooter and the cursor
      const angle = Math.atan2(cursor.y - shooterPosition.top - shooterCenter.y, cursor.x - shooterPosition.left - shooterCenter.x);
      // I want to rotate the shooter to always point at the user's cursor
      shooter.css("transform", "rotate(" + angle + "rad)");
    });
    // When the user clicks, I want to fire a bullet
    // Bind to both mousedown and pointerdown

    let targets = [];
    let scoreboard;
    let score = 0;
    let scoreTotal = 0;

    $(document).on("mousedown", function (event) {
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

      // I want to create a bullet
      const bullet = $('<div class="bullet"></div>');
      // I want to position the bullet at the center of the shooter
      bullet.css("left", shooterPosition.left + shooterCenter.x);
      bullet.css("top", shooterPosition.top + shooterCenter.y);
      // I want to append the bullet to the body
      $("body").append(bullet);
      // I want to animate the bullet to the cursor
      // Calculate the duration based on the distance needed to travel
      const distance = Math.sqrt(
        Math.pow(cursor.x - (shooterPosition.left + shooterCenter.x), 2) + Math.pow(cursor.y - (shooterPosition.top + shooterCenter.y), 2)
      );
      bullet.animate(
        {
          left: cursor.x,
          top: cursor.y,
        },
        distance,
        function () {
          // I want to remove the bullet from the DOM
          bullet.remove();
          // I want to remove the target from the DOM
          for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            const targetPosition = target.offset();
            const targetCenter = {
              x: target.width() / 2,
              y: target.height() / 2,
            };
            const distance = Math.sqrt(
              Math.pow(targetPosition.left + targetCenter.x - cursor.x, 2) + Math.pow(targetPosition.top + targetCenter.y - cursor.y, 2)
            );
            if (distance < 20) {
              target.remove();
              targets.splice(i, 1);
              score++;
              updateScoreboard();
              break;
            }
          }
          if (targets.length === 0) {
            createTargets();
          }
        }
      );
    });

    function createTargets(firstPosition) {
      for (let i = 0; i < 10; i++) {
        const target = $('<i class="fa-solid fa-bullseye target"></i>');
        target.css("left", firstPosition ? firstPosition.left : Math.random() * (window.innerWidth - 32));
        target.css("top", firstPosition ? firstPosition.top : Math.random() * ($(document).height() - 32));
        firstPosition = null;
        $("body").append(target);
        targets.push(target);
      }
      scoreTotal += 10;
    }

    function createScoreboard() {
      scoreboard = $('<div class="scoreboard"></div>');
      $("body").append(scoreboard);
      updateScoreboard();
    }

    function updateScoreboard() {
      scoreboard.text("Score: " + score + "/" + scoreTotal);
    }
  }
});
