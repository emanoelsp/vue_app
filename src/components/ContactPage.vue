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
                <input type="text" id="name" v-model="name" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.name }" />
                <p v-if="erros.name" class="text-red-500 text-sm">
                    {{ erros.name }}
                </p>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.email }" />
                <p v-if="erros.email" class="text-red-500 text-sm">
                    {{ erros.email }}
                </p>
                <label for="message">Mensagem:</label>
                <textarea id="message" v-model="message" class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': erros.message }"></textarea>
                <p v-if="erros.message" class="text-red-500 text-sm">
                    {{ erros.message }}
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
import { useRouter } from 'vue-router'
const name = ref('')
const email = ref('')
const message = ref('')
const erros = reactive({ name: '', email: '', message: '' })
const popup = reactive({
    mostrar: false,
    sucesso: true,
    mensagem: '',
})
const router = useRouter()
const validar = () => {
    erros.name = name.value.trim() === '' ? 'Nome é obrigatório.' : ''
    erros.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'E-mail inválido.'
    erros.message = message.value.trim().length >= 10 ? '' : 'Mensagem deve ter ao menos 10 caracteres.'
    return !erros.name && !erros.email && !erros.message
}
const enviarFormulario = async () => {
    if (!validar()) return
    try {
        const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value,
            }),
        })
        if (!response.ok) throw new Error('Erro ao enviar mensagem.')
        popup.sucesso = true
        popup.mensagem = `Obrigado, ${name.value}! Sua mensagem foi enviada.`
        name.value = ''
        email.value = ''
        message.value = ''
        popup.mostrar = true
        setTimeout(() => {
            popup.mostrar = false
            router.push('/mensagens')
        }, 2000)
    } catch (error) {
        popup.sucesso = false
        popup.mensagem = 'Erro ao enviar mensagem. Tente novamente mais tarde.'
        popup.mostrar = true
        setTimeout(() => {
            popup.mostrar = false
        }, 3000)
    }
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