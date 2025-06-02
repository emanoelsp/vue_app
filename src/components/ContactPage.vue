<template>
    <div class="max-w-xl mx-auto contact-page bg-light p-4">
        <h1 class="text-3xl font-bold mb-4 text-center">
            Envie sua mensagem
        </h1>
        <p class="m-4 text-center">
            Se você tiver alguma dúvida ou sugestão,
            sinta-se à vontade para entrar em contato conosco.
            Responderemos suas dúvidas assim que possível.
        </p>
        <form @submit.prevent="enviarFormulario" class="space-y-4">
            <div class="form-group space-y-2">
                <label for="name">Nome:</label>
                <input type="text" id="name"  v-model="nome" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.nome }" />
                <p v-if="erros.nome" class="text-red-500 text-sm">
                    {{ erros.nome }}
                </p>
                <label for="email">Email:</label>
                <input type="text" id="email"  v-model="email" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.email }" />
                <p v-if="erros.email" class="text-red-500 text-sm">
                    {{ erros.email }}
                </p>
                <label for="message">Mensagem:</label>
                <textarea id="message"  v-model="mensagem" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.mensagem }"></textarea>
                <p v-if="erros.mensagem" class="text-red-500 text-sm">
                    {{ erros.mensagem }}
                </p>
            </div>
            <button type="submit" class="btn btn-primary bg-indigo-600 text-white rounded
            p-4 hover:bg-indigo-900">Enviar Mensagem</button>
        </form>
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="popup.mostrar" class="fixed bottom-4 right-4 
                    bg-green-500 text-white p-4 rounded shadow-lg"
                    :class="popup.sucesso ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'">
                    {{ popup.mensagem }}
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const nome = ref('')
const email = ref('')
const mensagem = ref('')
const erros = reactive({ nome: '', email: '', mensagem: '' })
const popup = reactive({
    mostrar: false,
    sucesso: true,
    mensagem: '',
})
const validar = () => {
    erros.nome = nome.value.trim() === '' ? 'Nome é obrigatório.' : ''
    erros.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'E-mail inválido.'
    erros.mensagem = mensagem.value.trim().length >= 10 ? '' : 'Mensagem deve ter ao menos 10 caracteres.'
    return !erros.nome && !erros.email && !erros.mensagem
}
const enviarFormulario = () => {
    if (!validar()) return
    const sucessoSimulado = Math.random() > 0.5
    popup.sucesso = sucessoSimulado
    popup.mensagem = sucessoSimulado
        ? `Obrigado, ${nome.value}! Mensagem enviada.`
        : 'Erro ao enviar mensagem. Tente novamente.'
    popup.mostrar = true
    if (sucessoSimulado) {
        nome.value = ''
        email.value = ''
        mensagem.value = ''
    }
    setTimeout(() => {
        popup.mostrar = false
    }, 5000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>