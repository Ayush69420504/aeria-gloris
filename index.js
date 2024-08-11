const user = 'ayush'
const server = 'doge69420504'

var scanlines = $('.scanlines');
var tv = $('.tv');
function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });  

const root = '~';
let cwd = root;

const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    echo(...args) {
        term.echo(args.join(' '));
    },
	cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    }
};

const command_list = ['clear', 'exit'].concat(Object.keys(commands));
const help = formatter.format(command_list);

const font = 'ANSI Shadow';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

function prompt() {
    return `[[;green;]${user}@${server}][[;blue;]${cwd}$]`;
}

const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    completion: true,
    prompt
});

term.pause();

function ready() {
    const seed = rand(256);
    term.echo(() => rainbow(render('This is test'), seed), {ansi: true}).resume();
    term.exec('help', true);
}

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render(text) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}
