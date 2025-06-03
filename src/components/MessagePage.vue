<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Mensagens Enviadas</h1>
    <div v-if="loading" class="text-center my-8">Carregando...</div>
    <div v-else>
      <div v-if="mensagens.length === 0" class="text-center text-gray-500">Nenhuma mensagem enviada.</div>
      <div v-for="msg in mensagens" :key="msg._id" class="bg-white rounded shadow p-4 mb-4">
        <div v-if="editandoId === msg._id">
          <input v-model="editData.name" class="border p-2 rounded w-full mb-2" placeholder="Nome" />
          <input v-model="editData.email" class="border p-2 rounded w-full mb-2" placeholder="Email" />
          <textarea v-model="editData.message" class="border p-2 rounded w-full mb-2" placeholder="Mensagem"></textarea>
          <button @click="salvarEdicao(msg._id)" class="bg-green-600 text-white px-4 py-2 rounded mr-2">Salvar</button>
          <button @click="cancelarEdicao" class="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
        <div v-else>
          <p><strong>Nome:</strong> {{ msg.name }}</p>
          <p><strong>Email:</strong> {{ msg.email }}</p>
          <p><strong>Mensagem:</strong> {{ msg.message }}</p>
          <div class="mt-2">
            <button @click="editarMensagem(msg)" class="bg-blue-600 text-white px-3 py-1 rounded mr-2">Editar</button>
            <button @click="excluirMensagem(msg._id)" class="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="popup.mostrar" class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg"
          :class="popup.sucesso ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'">
          {{ popup.mensagem }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const mensagens = ref([])
const loading = ref(true)
const editandoId = ref(null)
const editData = reactive({ name: '', email: '', message: '' })
const popup = reactive({
  mostrar: false,
  sucesso: true,
  mensagem: '',
})

const buscarMensagens = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/usuarios')
    mensagens.value = await res.json()
  } catch {
    mensagens.value = []
  }
  loading.value = false
}

const excluirMensagem = async (id) => {
  if (!confirm('Deseja realmente excluir esta mensagem?')) return
  try {
    await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' })
    mensagens.value = mensagens.value.filter(m => m._id !== id)
    mostrarPopup('Mensagem excluída com sucesso!', true)
  } catch {
    mostrarPopup('Erro ao excluir mensagem.', false)
  }
}

const editarMensagem = (msg) => {
  editandoId.value = msg._id
  editData.name = msg.name
  editData.email = msg.email
  editData.message = msg.message
}

const salvarEdicao = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editData.name,
        email: editData.email,
        message: editData.message,
      }),
    })
    const atualizado = await res.json()
    const idx = mensagens.value.findIndex(m => m._id === id)
    if (idx !== -1) mensagens.value[idx] = atualizado
    editandoId.value = null
    mostrarPopup('Mensagem atualizada com sucesso!', true)
  } catch {
    mostrarPopup('Erro ao atualizar mensagem.', false)
  }
}

const cancelarEdicao = () => {
  editandoId.value = null
}

function mostrarPopup(msg, sucesso = true) {
  popup.sucesso = sucesso
  popup.mensagem = msg
  popup.mostrar = true
  setTimeout(() => { popup.mostrar = false }, 2500)
}

onMounted(buscarMensagens)
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