//

// GAME: handles the overall Game.
let Game = {
    Properties: {
        MenuOpen: false
    },
    Start: function () {
        Player.Start();
    },
    Menu: function () {
        // Needs to move into UI object and menu / backdrop separated
        document.getElementById("menu").style.display = Game.Properties.MenuOpen == true ? "none" : "block";
        document.getElementById("backdrop").style.display = Game.Properties.MenuOpen == true ? "none" : "block";
        Game.Properties.MenuOpen = !Game.Properties.MenuOpen;
    }
}

// FIELD: handles the playing field
let Field = {
    Width: function () {
        return window.innerWidth;
    },
    Height: function () {
        return window.innerHeight;
    }
}

// PLAYER: handles all aspects of the player
let Player = {
    Start: function () {
        Player.Position.SetX((Field.Width() / 2));
        Player.Position.SetY((Field.Height() / 2));
    },
    Self: function () {
        // this isn't handy when accessing element attributes
        return document.getElementById("player");
    },
    Properties: {
        Health: 100,
        Mana: 100,
        Velocity: 2
    },
    Position: {
        GetX: function () {
            let player = Player.Self();
            return parseInt(player.style.left);
        },
        GetY: function () {
            let player = Player.Self();
            return parseInt(player.style.top);
        },
        SetX: function (value) {
            Player.Self().style.left = parseInt(value) + "px";
        },
        SetY: function (value) {
            Player.Self().style.top = parseInt(value) + "px";
        },
    },
}

// CONTROLS: hanldes all aspects of the controls
let Controls = {
    // Using fall throughs for now but can be handled differently
    // esp if I use multi keys down at once like shift + wasd to sprint
    Input: function (event) {
        switch (event.key) {
            case 'w':
            case 'a':
            case 's':
            case 'd':
                Controls.Move(event);
                break;
            case 1:
            case 2:
            case 3:
                // cast spells on target
                // need targeting system built
                break;
            case 'm':
                debugger
                Game.Menu();
            default:
                break;
        }
    },
    Move: function (event) {

        // potentially faster to observe x, y as stored values
        // instead of accessing the html element each time?

        // would probs help whenever multiplayer is introduced
        // to handle sending data via sockets

        let x = Player.Position.GetX();
        let y = Player.Position.GetY();

        let velocity = Player.Properties.Velocity;

        switch (event.key) {
            case 'w':
                y -= velocity;
                break;
            case 'a':
                x -= velocity;
            break;
            case 's':
                y += velocity;
            break;
            case 'd':
                x += velocity;
            break;
            default:
                break;
        }

        Player.Position.SetX(x);
        Player.Position.SetY(y);

    }
}