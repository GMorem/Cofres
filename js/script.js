let numeroSecreto = sortearNumero();
let tentativasRestantes = 7;
let tentativasUsadas = 0;
let jogoFinalizado = false;

const inputChute = document.getElementById('chute');
const btnTentar = document.getElementById('btnTentar');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnJogarNovamente = document.getElementById('btnJogarNovamente');
const mensagem = document.getElementById('mensagem');
const infoTentativas = document.getElementById('infoTentativas');
const imagemCofre = document.getElementById('imagemCofre');
const painelCofre = document.getElementById('painelCofre');
const modalOverview = document.getElementById('modalOverview');
const textoTentativasFinais = document.getElementById('textoTentativasFinais');

function sortearNumero() {
    return Math.floor(Math.random() * 50) + 1;
}

function verificarSenha() {
    if (jogoFinalizado) return;

    const palpite = Number(inputChute.value);

    if (!inputChute.value || !Number.isInteger(palpite) || palpite < 1 || palpite > 50) {
        mensagem.style.color = '#d97706';
        mensagem.textContent = 'Digite um número válido entre 1 e 50.';
        inputChute.value = '';
        inputChute.focus();
        return;
    }

    tentativasRestantes--;
    tentativasUsadas++;
    inputChute.value = '';
    inputChute.focus();

    if (palpite === numeroSecreto) {
        jogoFinalizado = true;
        inputChute.disabled = true;
        btnTentar.disabled = true;

        imagemCofre.src = 'img/cadeado-aberto.png';
        imagemCofre.alt = 'Cofre aberto';
        painelCofre.classList.add('desbloqueado');

        textoTentativasFinais.textContent = `Foram necessárias ${tentativasUsadas} tentativa(s) para abrir o cofre.`;
        
        setTimeout(() => {
            modalOverview.classList.add('ativo');
        }, 400);
        return;
    }

    if (palpite < numeroSecreto) {
        mensagem.style.color = '#059669';
        mensagem.textContent = 'A senha é maior!';
    } else {
        mensagem.style.color = '#059669';
        mensagem.textContent = 'A senha é menor!';
    }

    infoTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;

    if (tentativasRestantes === 2) {
        infoTentativas.classList.add('alerta-urgente');
        infoTentativas.textContent = 'Atenção! Restam apenas 2 tentativas!';
    }

    if (tentativasRestantes === 0) {
        jogoFinalizado = true;
        inputChute.disabled = true;
        btnTentar.disabled = true;
        mensagem.style.color = '#dc2626';
        mensagem.textContent = `Cofre bloqueado! A senha era ${numeroSecreto}.`;
        infoTentativas.textContent = 'Suas 7 tentativas acabaram.';
        infoTentativas.classList.remove('alerta-urgente');
    }
}

function reiniciarJogo() {
    numeroSecreto = sortearNumero();
    tentativasRestantes = 7;
    tentativasUsadas = 0;
    jogoFinalizado = false;

    inputChute.disabled = false;
    btnTentar.disabled = false;
    inputChute.value = '';
    inputChute.focus();

    mensagem.textContent = '';
    infoTentativas.textContent = 'Tentativas restantes: 7';
    infoTentativas.classList.remove('alerta-urgente');

    imagemCofre.src = 'img/Cadeado.png';
    imagemCofre.alt = 'Cofre bloqueado';
    painelCofre.classList.remove('desbloqueado');
    modalOverview.classList.remove('ativo');
}

btnTentar.addEventListener('click', verificarSenha);
btnReiniciar.addEventListener('click', reiniciarJogo);
btnJogarNovamente.addEventListener('click', reiniciarJogo);

inputChute.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        verificarSenha();
    }
});