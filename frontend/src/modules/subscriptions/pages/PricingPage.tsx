import React, { useEffect, useState } from 'react';
import { getCurrentSubscription, createPaymentOrder, Subscription } from '../api';

const PLANS = [
    {
        code: 'FREE',
        name: 'Gratis',
        price: 'S/ 0',
        features: ['Acceso Básico', '1 Usuario', 'Soporte Comunitario'],
        color: 'bg-gray-100 text-gray-800',
    },
    {
        code: 'BASIC',
        name: 'Básico',
        price: 'S/ 50',
        period: '/mes',
        features: ['Hasta 5 Usuarios', 'Facturación', 'Soporte Email'],
        color: 'bg-blue-100 text-blue-800',
        primary: true,
    },
    {
        code: 'PRO',
        name: 'Pro',
        price: 'S/ 100',
        period: '/mes',
        features: ['Usuarios Ilimitados', 'API Access', 'Soporte Prioritario 24/7'],
        color: 'bg-purple-100 text-purple-800',
    },
];

declare global {
    interface Window {
        Culqi: any;
        culqi: () => void;
    }
}

export const PricingPage = () => {
    const [currentSub, setCurrentSub] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    useEffect(() => {
        loadSubscription();

        // Inject Culqi Script
        const script = document.createElement('script');
        script.src = 'https://checkout.culqi.com/js/v4';
        script.async = true;
        document.body.appendChild(script);

        // Define Culqi callback (optional for basic notification, webhooks handle the real work)
        window.culqi = () => {
            if (window.Culqi.token) {
                // Token created successfuly. 
                // In Order-based flows, payment might be auto-processed or requires a 2nd step.
                // With Orders (v4), usually the webhook confirms.
                console.log('Token created:', window.Culqi.token.id);
                window.Culqi.close();
                alert('¡Pago en proceso! Tu suscripción se activará en breve.');
                window.location.reload();
            } else {
                console.error('Culqi Error:', window.Culqi.error);
                alert(window.Culqi.error.user_message);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const loadSubscription = async () => {
        try {
            const sub = await getCurrentSubscription();
            setCurrentSub(sub);
        } catch (error) {
            console.error('Failed to load subscription', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (planCode: string) => {
        setProcessing(planCode);
        try {
            // 1. Create Order in Backend
            const orderInfo = await createPaymentOrder(planCode);

            // 2. Open Culqi Checkout
            if (window.Culqi) {
                window.Culqi.publicKey = orderInfo.publicKey;
                window.Culqi.settings({
                    title: 'SaaS Subscription',
                    currency: 'PEN',
                    description: orderInfo.description,
                    amount: orderInfo.amount,
                    order: orderInfo.orderId // Critical for associating payment
                });

                window.Culqi.options({
                    style: {
                        logo: 'https://static.culqi.com/v2/v2/static/img/logo.png', // Default
                        maincolor: '#0ec1c1',
                        headcolor: '#0ec1c1',
                    }
                });

                window.Culqi.open();
                setProcessing(null); // Reset UI, modal is open
            } else {
                alert('Error: Culqi no cargó correctamente. Refresca la página.');
            }

        } catch (error) {
            console.error('Checkout failed', error);
            alert('Error al iniciar el pago. Inténtalo de nuevo.');
            setProcessing(null);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando planes...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Elige el plan perfecto para tu negocio (Perú)</h1>
                <p className="text-gray-600">Pagos seguros con Culqi (BCP, BBVA, Interbank).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PLANS.map((plan) => {
                    const isCurrent = currentSub?.planCode === plan.code;
                    const isFree = plan.code === 'FREE';

                    return (
                        <div
                            key={plan.code}
                            className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${isCurrent ? 'ring-2 ring-indigo-500 border-transparent' : 'border-gray-200'
                                }`}
                        >
                            {isCurrent && (
                                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wide">
                                    Plan Actual
                                </span>
                            )}

                            <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline text-gray-900">
                                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                                {plan.period && <span className="ml-1 text-xl text-gray-500">{plan.period}</span>}
                            </div>

                            <ul className="mt-6 space-y-4 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex">
                                        <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="ml-3 text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => !isCurrent && !isFree && handleSubscribe(plan.code)}
                                disabled={isCurrent || isFree || !!processing}
                                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${isCurrent
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : isFree
                                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-colors'
                                    }`}
                            >
                                {processing === plan.code ? 'Cargando Culqi...' : isCurrent ? 'Tu Plan Actual' : 'Suscribirse'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
