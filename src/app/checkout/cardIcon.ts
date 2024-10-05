import VisaCardIcon from "@/assets/svgs/VisaCardIcon";
import MasterCardIcon from "@/assets/svgs/MasterCardIcon";
import AmericanExpressLogo from "@/assets/svgs/americanCardIcon";
import DiscoverCardIcon from "@/assets/svgs/DiscoverCardIcon";
import JcbPay from "@/assets/svgs/JcbPay";
import UniounPay from "@/assets/svgs/UniounPay";
import EloPay from "@/assets/svgs/EloPay";

interface CardIconMap {
    [key: string]: React.ComponentType;
}
export const cardIcons: CardIconMap = {
    'Visa': VisaCardIcon,
    'Mastercard': MasterCardIcon,
    'American Express': AmericanExpressLogo,
    // 'Diners Club': '/icons/dinersclub.svg',
    'Discover': DiscoverCardIcon,
    'JCB': JcbPay,
    'UnionPay': UniounPay,
    // 'Maestro': '/icons/maestro.svg',
    // 'Mir': '/icons/mir.svg',
    'Elo': EloPay,
    // 'Hiper': '/icons/hiper.svg',
    // 'Hipercard': '/icons/hipercard.svg',
};
