import { Client } from "ldapts";
import * as jdenticon from "jdenticon";
import { NextRequest } from "next/server";

function extractPhoto(user: any): Buffer | null {
  const candidates = [user?.thumbnailPhoto, user?.jpegPhoto, user?.photo];

  for (const value of candidates) {
    if (!value) continue;

    // ldapts іноді повертає масив
    if (Array.isArray(value)) {
      if (value.length > 0 && Buffer.isBuffer(value[0])) {
        return value[0];
      }
      continue;
    }

    if (Buffer.isBuffer(value) && value.length > 0) {
      return value;
    }
  }

  return null;
}


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  const client = new Client({
    url: process.env.LDAP_URL!,
    timeout: 5000,
    connectTimeout: 5000,
  });

  try {
    await client.bind(
      process.env.LDAP_BIND_DN!,
      process.env.LDAP_BIND_PASSWORD!
    );

    const { searchEntries } = await client.search(
      process.env.LDAP_BASE_DN!,
      {
        scope: "sub",
        filter: `(sAMAccountName=${username})`,
        // attributes: ["thumbnailPhoto", "jpegPhoto", "photo"],
        attributes: ["photo"],
      }
    );
    const user = searchEntries[0] as any;

    // const photoBuffer: Buffer | undefined =
    //   // user?.thumbnailPhoto ||
    //   // user?.jpegPhoto ||
    //   user?.photo;

const photoBuffer = extractPhoto(user);

    // ✅ Якщо фото є — віддаємо його
    if (photoBuffer) {
      return new Response(new Uint8Array(photoBuffer), {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // 🟣 Якщо фото нема — генеруємо SVG аватар
    const size = 128;
    jdenticon.configure({
      backColor: "#e5dfd2"
    })
    const svg = jdenticon.toSvg(username, size);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });

  } catch (err) {
    console.error("LDAP photo error:", err);

    // 🔴 Навіть якщо LDAP впав — все одно покажемо аватар
    const svg = jdenticon.toSvg(username, 128);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } finally {
    await client.unbind().catch(() => {});
  }
}

