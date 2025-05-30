# Dashboard Layout

Este layout fornece uma estrutura completa de dashboard com sidebar para a aplicação MeetAI.

## Características

- ✅ Sidebar responsivo com collapse automático em mobile
- ✅ Menu de navegação com ícones
- ✅ Logo MeetAI integrado
- ✅ Informações do usuário logado
- ✅ Botão de logout funcional
- ✅ Header com breadcrumb
- ✅ Trigger para toggle do sidebar
- ✅ Suporte a temas dark/light
- ✅ Animações suaves

## Como usar

```tsx
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MinhaPage() {
  return (
    <DashboardLayout userEmail="usuario@exemplo.com">
      <div className="p-6">
        <h1>Conteúdo da página</h1>
        <p>Seu conteúdo aqui...</p>
      </div>
    </DashboardLayout>
  );
}
```

## Props

| Prop        | Tipo              | Obrigatório | Descrição                   |
| ----------- | ----------------- | ----------- | --------------------------- |
| `children`  | `React.ReactNode` | ✅          | Conteúdo da página          |
| `userEmail` | `string`          | ❌          | Email do usuário (opcional) |

## Estrutura do Menu

O sidebar inclui os seguintes itens de navegação:

- 🏠 Dashboard (`/dashboard`)
- 📹 Reuniões (`/meetings`)
- 💬 Chat (`/chat`)
- 👥 Contatos (`/contacts`)
- 📅 Agenda (`/calendar`)
- 📊 Relatórios (`/reports`)
- 📄 Documentos (`/documents`)
- ⚙️ Configurações (`/settings`)

## Responsividade

- **Desktop**: Sidebar fixo com opção de collapse
- **Mobile**: Sidebar em sheet/drawer que aparece por cima do conteúdo
- **Tablet**: Sidebar responsivo que se adapta ao tamanho da tela

## Atalhos de Teclado

- `Ctrl/Cmd + B`: Toggle do sidebar

## Customização

Para personalizar o layout, você pode:

1. **Modificar o menu**: Edite o array `menuItems` no componente
2. **Alterar cores**: As cores seguem o sistema de design tokens
3. **Adicionar novos itens**: Adicione novos objetos ao array de menu
4. **Personalizar header**: Modifique a seção `header` do layout

## Dependências

- `@/components/ui/sidebar` - Componentes de sidebar
- `@/components/custom/Logo` - Logo MeetAI
- `@/lib/auth-client` - Cliente de autenticação
- `lucide-react` - Ícones
- `next/navigation` - Navegação do Next.js
