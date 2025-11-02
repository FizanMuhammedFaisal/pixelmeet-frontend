// dayNight.frag

precision mediump float;

uniform float uTime;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main() {
    vec4 color = texture2D(uMainSampler, outTexCoord);

    // time goes from 0.0 (day) to 1.0 (night)
    float darkness = smoothstep(0.3, 0.7, abs(sin(uTime))); // smooth transition
    vec3 nightTint = vec3(0.1, 0.1, 0.3); // bluish night color

    // blend day color with night tint
    color.rgb = mix(color.rgb, nightTint, darkness);
    gl_FragColor = color;
}
