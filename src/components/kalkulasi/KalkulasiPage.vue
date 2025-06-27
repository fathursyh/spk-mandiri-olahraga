<script setup lang="ts">
    import { computed, provide, reactive, ref } from "vue";
    import KalkulasiTabs from "../partials/KalkulasiTabs.vue";
    import PakarSection from "./PakarSection.vue";
    import CustomSection from "./CustomSection.vue";
    import CustomAlert from "../feedbacks/CustomAlert.vue";
    import { AlertEnum } from "../../enums/AlertEnum";
    
    const mode = ref(new URLSearchParams(window.location.search).get("mode"));

    const changeMode = () => {
        mode.value = new URLSearchParams(window.location.search).get("mode");
    };
    provide("mode", mode);
    const spkContent = computed(() => {
        if (mode.value === "pakar") return PakarSection;
        if (mode.value === "custom") return CustomSection;
    });

    const alertFeedback = reactive({
        show: false,
        type: AlertEnum.Success,
        text: '',
    });
    const showAlert = (type: AlertEnum, text: string) => {
        alertFeedback.type = type;
        alertFeedback.text = text;
        alertFeedback.show = true;
        const timer = setTimeout(() => {
            alertFeedback.show = false;
            clearTimeout(timer);
        }, 3000);
    }
    provide('showAlert', showAlert);
</script>

<template>
        <h1 class="text-3xl font-bold text-gray-800 text-center mt-12 mb-8" data-aos="fade-down">Kalkulasi SPK <span class="text-green-600">Fuzzy dan AHP-SAW</span></h1>
        <section class="w-full h-full relative" aria-label="Header dan form" data-aos="fade-up">
            <KalkulasiTabs @on-change-tab="changeMode" />
            <Transition name="fade" mode="out-in">
                    <component :is="spkContent" />
            </Transition>
        </section>
    <Teleport to="body">
        <Transition name="fade" mode="out-in">
            <CustomAlert v-if="alertFeedback.show" :type="alertFeedback.type" :text="alertFeedback.text" />
        </Transition>
    </Teleport>
</template>
