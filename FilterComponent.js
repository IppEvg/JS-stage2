Vue.component('sort', {
    template: `
    <form action="#" class="search-form" @sumbit.prevent="$root.filter">
                    <input type="text" class="search-field" v-model="$root.userSearch" @input="$root.filter">
                    <button class="btn-search" type="submit">
                        Фильтр
                    </button>
                </form>>
    `
}) 