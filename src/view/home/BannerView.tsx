import { IBanner } from "@/types/Banner";
import styles from "./BannerView.module.css";
import { ImageApp } from "@/components/Image/ImageApp";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { LoadingApp } from "@/components/Loading/LoadingApp";

interface propsBannerView {
  banners: IBanner[];
  status?: StatusRequisicao;
}

export function BannerView(props: propsBannerView) {
  if (props.status === "loading") {
    return <LoadingApp height="150px" width="100%" texto="Carregando banners..." />;
  }

  if (props.banners.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.carrossel}>
      <div className={styles.track}>
        {props.banners.map((banner) => (
          <ImageApp
            width={300}
            height={200}
            key={banner.id}
            src={banner.foto}
            alt={banner.id}
            className={styles.image}
          />
        ))}
        {props.banners.map((banner) => (
          <ImageApp
            width={300}
            height={200}
            key={banner.id}
            src={banner.foto}
            alt={banner.id}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
}
