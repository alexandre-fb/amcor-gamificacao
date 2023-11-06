import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import LayoutDefault from '../layouts/LayoutDefault.vue'
import LayoutSecondary from '../layouts/LayoutSecondary.vue'
import LayoutEmpty from '../layouts/LayoutEmpty.vue'

const Example = () => import('../views/ExampleView/index.vue')
const Login = () => import('../views/Login/index.vue')
const Cadastro = () => import('../views/Cadastro/index.vue')
const ContatoRh = () => import('../views/ContatoRh/index.vue')
const Home = () => import('../views/Home/index.vue')
const Sobre = () => import('../views/Sobre/index.vue')
const Cenarios = () => import('../views/Cenarios/index.vue')
const CenarioDetalhe = () => import('../views/CenarioDetalhe/index.vue')
const Ranking = () => import('../views/Ranking/index.vue')
const Contato = () => import('../views/Contato/index.vue')
const Conta = () => import('../views/Conta/index.vue')
const Notificacoes = () => import('../views/Notificacoes/index.vue')
const Historico = () => import('../views/Historico/index.vue')
const PoliticaPrivacidade = () => import('../views/PoliticaPrivacidade/index.vue')
const Busca = () => import('../views/Busca/index.vue')
const Foto = () => import('../views/Foto/index.vue')
const Game = () => import('../views/Game/index.vue')


export const routes = [
    {
        path: '/exemplo',
        name: 'example',
        component: Example,
        meta: {
            layout: LayoutDefault
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: LayoutSecondary,
            auth: false
        }
    },
    {
        path: '/cadastro',
        name: 'cadastro',
        component: Cadastro,
        meta: {
            layout: LayoutSecondary,
            auth: false
        }
    },
    {
        path: '/contato-rh',
        name: 'contato-rh',
        component: ContatoRh,
        meta: {
            layout: LayoutSecondary,
            auth: false
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/sobre',
        name: 'sobre',
        component: Sobre,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/cenarios',
        name: 'cenarios',
        component: Cenarios,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/cenario-detalhe',
        name: 'cenario-detalhe',
        component: CenarioDetalhe,
        meta: {
            layout: LayoutDefault,
            auth: true
        },
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/contato',
        name: 'contato',
        component: Contato,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/conta',
        name: 'conta',
        component: Conta,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/historico',
        name: 'historico',
        component: Historico,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/notificacoes',
        name: 'notificacoes',
        component: Notificacoes,
        meta: {
            layout: LayoutDefault,
            auth: false
        }
    },
    {
        path: '/politica-privacidade',
        name: 'PoliticaPrivacidade',
        component: PoliticaPrivacidade,
        meta: {
            layout: LayoutSecondary,
            auth: false
        }
    },
    {
        path: '/resutaldo-busca',
        name: 'busca',
        component: Busca,   
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/foto',
        name: 'foto',
        component: Foto,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
    {
        path: '/game/:slug/:id',
        name: 'game',
        component: Game,
        meta: {
            layout: LayoutDefault,
            auth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach(async (to, from, next) => {
    if(to.meta?.auth) {

        const userStore = useUserStore()

        if(userStore.token && userStore.user) {

            const isAutenticated = await userStore.verifyToken()
            if(isAutenticated) {
                next()
            } else {
                next({ name: 'login' })
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        // se nao tiver auth no meta segue o fluxo normal
        next()
    }
})

export default router

