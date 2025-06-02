<template>
    <div class="max-w-4xl mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4"> SOBRE A EMPRESA </h1>
        <p>Essa página contem informações sobre nossa empresa </p>
        <ul class="list-disc pl-5 mt-4">
            <li v-for="(items, index) in infos" :key="index">
                {{ items }}
            </li>
        </ul>
        <div class="mt-6">
            <p>Para mais informações, clique no botão abaixo.</p>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                @click="mostrarInformacoes = !mostrarInformacoes">
                {{ mostrarInformacoes ? 'Esconder Informações' : 'Mostrar Informações' }}
            </button>
            <div v-if="mostrarInformacoes" class="mt-4">
                <p>Informações adicionais sobre a empresa podem ser encontradas aqui.</p>
                <ul class="list-disc pl-5 mt-2">
                    <li>Missão: Inovar e transformar o mercado.</li>
                    <li>Visão: Ser líder em soluções tecnológicas.</li>
                    <li>Valores: Ética, transparência e compromisso com o cliente.</li>
                </ul>
            </div>
        </div>
        <div class="mt-6">
            <label class="block mb-2 text-sm font-medium text-gray-700">
                Oque você achou de usar o VUE?
            </label>
            <input type="text" class="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Digite sua opinião aqui..." v-model="opiniao">
            <p v-if="opiniao" class="mt-2 text-green-600">
                Obrigado por compartilhar sua opinião! <strong>{{ opiniao }}</strong>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
    name: 'AboutPage',
   setup() {
        const mostrarInformacoes = ref(false);
        const opiniao = ref('');
        const infos = [
            'A empresa foi fundada em 2020.',
            'Nosso objetivo é fornecer soluções inovadoras.',
            'Temos uma equipe dedicada e apaixonada pelo que faz.',
            'Estamos comprometidos com a sustentabilidade e responsabilidade social.',
            'Contamos com uma base de clientes global.',
            'Nossos produtos são desenvolvidos com tecnologia de ponta.',
        ];
        return { mostrarInformacoes, opiniao, infos };
    }
}
</script>