const app = {
    state: {
        loading: false,
        img: '',
        show:false
    },
    mutations: {
        cloas_loading: state => {
            state.loading = false
        },
        open_loading: state => {
            state.loading = true
        },
        open_img: (state, src) => {
            state.img = src;
            state.show = true;
        }

    }
}

export default app
