import Link from 'next/link';
import Image from 'next/image';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { footerResponse } from '@/interfaces/footerResponse';
import { useGetAPI } from '@/hooks/use-api';
import { useEffect } from 'react';

export function FooterBar() {
  const [response, loading, fetchData] = useGetAPI<
    ApiPaginatedResponse<footerResponse>
  >('footericonpage/', { page: 1, limit: 10 });

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {/* Footer */}
      <div className="flex h-20 w-full items-center justify-center bg-blue-950">
        {response?.data.map((item) => (
          <div className="flex overflow-hidden rounded-lg p-5" key={item.id}>
            <div className="relative aspect-square h-[60px] w-[60px]">
              <Link
                href={item.link_ref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={item.icon_img || '/images/facebook.avif'}
                  alt={item.title|| 'No Resopones'}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
