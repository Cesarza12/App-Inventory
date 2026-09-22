import { useAuth } from '../context/useAuth'

function Header() {
    const { user } = useAuth()

    return (
        <header className="flex min-h-16 items-center justify-between border-b border-gray-200 bg-white px-6">

            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    
                </h1>

                {user && (
                    <p className="text-sm text-gray-500">
                        Bienvenido, {user.name}
                    </p>
                )}
            </div>

        </header>
    )
}

export default Header