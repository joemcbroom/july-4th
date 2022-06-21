<script setup>
import { onMounted, ref, computed } from 'vue';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import { supabase } from '@/supabase';

const data = ref([]);
const tableData = ref([]);

const settings = {
  licenseKey: 'non-commercial-and-evaluation',
  colHeaders: false,
  rowHeaders: false,
  collapsibleColumns: true,
};

const formatData = data => {
  const columnNames = Object.keys(data[0]);
  return [[...columnNames], ...data.map(row => Object.values(row))].map(arr => {
    //remove created_at and id
    arr.splice(0, 2);
    return arr;
  });
};

const copyAllEmails = () => {
  const emails = data.value.map(row => row.email);
  navigator.clipboard.writeText(emails.join(', '));
};

onMounted(async () => {
  registerAllModules();
  try {
    const { data: rsvps, error } = await supabase.from('rsvps').select('*');

    if (error) throw error;

    const formattedData = formatData(rsvps);
    tableData.value = formattedData;
    data.value = rsvps;
  } catch (error) {
    console.log(error);
  }
});

const getTotal = property => {
  const total = data.value.reduce((acc, row) => {
    return acc + (row.attending && row[property]);
  }, 0);

  return total;
};

const totalAdults = computed(() => {
  return getTotal('numberOfAdults');
});

const totalChildren = computed(() => {
  return getTotal('numberOfChildren');
});
</script>
<template>
  <div class="flex flex-col items-center gap-4" v-if="tableData.length">
    <hot-table
      :settings="settings"
      :data="tableData"
      :rowHeaders="false"
      :colHeaders="false"
    />
    <div class="flex justify-end items-center w-full gap-4">
      <button
        class="bg-teal-800 px-2 py-1 rounded cursor-pointer z-20 mr-auto"
        @click="copyAllEmails"
      >
        Copy Emails
      </button>
      <div
        class="text-right divide-y bg-teal-300 text-teal-800 divide-teal-700 px-2"
      >
        <div>Total Adults: {{ totalAdults }}</div>
        <div>Total Children: {{ totalChildren }}</div>
      </div>
    </div>
  </div>
</template>

<style src="handsontable/dist/handsontable.full.css"></style>
