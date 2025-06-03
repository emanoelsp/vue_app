  <template>
    <div>
      <nav class="bg-gray-800 p-4 text-white flex gap-4">
        <router-link to="/" class="hover:text-yellow-400">Início</router-link>
        <router-link to="/sobre" class="hover:text-yellow-400">Sobre</router-link>
        <router-link to="/contato" class="hover:text-yellow-400">Contato</router-link>
        <router-link to="/mensagens" class="hover:text-yellow-400">Mensagens</router-link>
      </nav>
      <router-view />
    </div>
  </template>


