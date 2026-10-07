export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
}

export interface Particle3D {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export class CursorTrailCalculator {
  /**
   * Projects a 3D point (x, y, z) into 2D screen space with perspective scaling.
   * fov represents the virtual camera focal length (e.g. 400px).
   */
  public static project3D(
    point: Point3D,
    fov: number = 400,
    centerX: number = 0,
    centerY: number = 0
  ): ProjectedPoint {
    const effectiveZ = Math.max(-fov + 10, point.z);
    const scale = fov / (fov + effectiveZ);
    return {
      x: centerX + (point.x - centerX) * scale,
      y: centerY + (point.y - centerY) * scale,
      scale: Math.max(0.01, scale),
    };
  }

  /**
   * Rotates a point around the X axis by the given angle (radians).
   */
  public static rotateX(y: number, z: number, angle: number): { y: number; z: number } {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      y: y * cos - z * sin,
      z: y * sin + z * cos,
    };
  }

  /**
   * Rotates a point around the Y axis by the given angle (radians).
   */
  public static rotateY(x: number, z: number, angle: number): { x: number; z: number } {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: x * cos + z * sin,
      z: -x * sin + z * cos,
    };
  }

  /**
   * Rotates a point around the Z axis by the given angle (radians).
   */
  public static rotateZ(x: number, y: number, angle: number): { x: number; y: number } {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: x * cos - y * sin,
      y: x * sin + y * cos,
    };
  }

  /**
   * Rotates a full 3D point around all 3 axes (Euler angles).
   */
  public static rotate3D(point: Point3D, rotX: number, rotY: number, rotZ: number): Point3D {
    const { y, z } = this.rotateX(point.y, point.z, rotX);
    const { x, z: newZ } = this.rotateY(point.x, z, rotY);
    const { x: finalX, y: finalY } = this.rotateZ(x, y, rotZ);
    return { x: finalX, y: finalY, z: newZ };
  }

  /**
   * Creates a new subtle 3D micro-spark particle at the cursor position.
   */
  public static createParticle(
    x: number,
    y: number,
    color: string,
    isBurst: boolean = false
  ): Particle3D {
    const speed = isBurst ? Math.random() * 1.5 + 0.8 : Math.random() * 0.6 + 0.2;
    const angle = Math.random() * Math.PI * 2;
    const zSpeed = (Math.random() - 0.5) * (isBurst ? 1.5 : 0.8);
    const maxLife = isBurst ? Math.floor(Math.random() * 8 + 14) : Math.floor(Math.random() * 6 + 10);

    return {
      id: `p-${Math.random().toString(36).slice(2, 9)}`,
      x,
      y,
      z: (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      vz: zSpeed,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: (Math.random() - 0.5) * 0.05,
      vRotY: (Math.random() - 0.5) * 0.05,
      vRotZ: (Math.random() - 0.5) * 0.05,
      size: isBurst ? Math.random() * 1.0 + 1.2 : Math.random() * 1.0 + 1.2,
      color,
      alpha: 1,
      life: maxLife,
      maxLife,
    };
  }

  /**
   * Updates a particle's 3D position, rotation, velocity decay, and life.
   * Returns true if particle is still active, false if expired.
   */
  public static updateParticle(particle: Particle3D, friction: number = 0.94): boolean {
    particle.life -= 1;
    if (particle.life <= 0) {
      particle.alpha = 0;
      return false;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.z += particle.vz;

    particle.vx *= friction;
    particle.vy *= friction;
    particle.vz *= friction;

    particle.rotX += particle.vRotX;
    particle.rotY += particle.vRotY;
    particle.rotZ += particle.vRotZ;

    particle.alpha = Math.max(0, particle.life / particle.maxLife);
    return true;
  }
}
